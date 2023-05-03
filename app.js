/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */

const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const path = require("path");

const { login } = require("./controllers/login");
const { createUser } = require("./controllers/users");
// const auth = require("./middlewares/auth");

const app = express();
const { PORT = 3000 } = process.env;

app.use(express.json());
app.use(helmet());

const { routerUser } = require("./routes/users");
const { routerCard } = require("./routes/cards");

const DATABASE = "localhost:27017/mestodb";

mongoose
  .connect(`mongodb://${DATABASE}`)
  .then(() => {
    console.log(`Подключение к БД '${DATABASE}' прошло успешно`);
  })
  .catch((err) => {
    console.log(
      `Подключение к БД '${DATABASE}' неудачное! Проверьте на ошибки - ${err}`
    );
  });

app.use(express.static(path.join(__dirname, "public")));

app.post("/signin", login);
app.post("/signup", createUser);
app.use("/users", routerUser);
app.use("/cards", routerCard);

// app.use("/users", auth, routerUser);
// app.use("/cards", auth, routerCard);

app.use((req, res) => {
  res.status(404).send({ message: "Введенный URL не найден в роутах сайта" });
});

app.listen(PORT, () => {
  console.log(PORT);
});

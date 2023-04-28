/* eslint-disable quotes */
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const { PORT = 3000 } = process.env;

app.use(express.json());

const { routerUser } = require("./routes/users");
const { routerCard } = require("./routes/cards");

mongoose
  .connect("mongodb://localhost:27017/mestodb")
  .then(() => {
    console.log("database ok");
  })
  .catch(() => {
    console.log("database err");
  });

app.use((req, res, next) => {
  req.user = {
    _id: "644a98b0f121166256b8c031", // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use("/users", routerUser);
app.use("/cards", routerCard);

app.use((req, res, next) => {
  next(res.status(404).send({ message: "URL not found" }));
});

// app.get("*", (req, res) => {
//   res.status(404).send({ message: "Запрашиваемый ресурс не найден" });
// });

app.listen(PORT, () => {
  console.log(PORT);
});

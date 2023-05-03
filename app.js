/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const path = require('path');

const { celebrate, Joi } = require('celebrate');

const { login } = require('./controllers/login');
const { createUser } = require('./controllers/users');
const { authorize } = require('./middlewares/auth');

const { regExpURLAddress } = require('./utils/regExpURLAddress');

const app = express();
const { PORT = 3000 } = process.env;

app.use(express.json());
app.use(helmet());

const { routerUser } = require('./routes/users');
const { routerCard } = require('./routes/cards');

const DATABASE = 'localhost:27017/mestodb';

mongoose
  .connect(`mongodb://${DATABASE}`)
  .then(() => {
    console.log(`Подключение к БД '${DATABASE}' прошло успешно`);
  })
  .catch((err) => {
    console.log(
      `Подключение к БД '${DATABASE}' неудачное! Проверьте на ошибки - ${err}`,
    );
  });

app.use(express.static(path.join(__dirname, 'public')));

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().regex(regExpURLAddress),
    }),
  }),
  createUser,
);

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

app.post('/signin', login);
app.post('/signup', createUser);
// app.use("/users", routerUser);
// app.use("/cards", routerCard);

app.use('/users', authorize, routerUser);
app.use('/cards', authorize, routerCard);

app.use((req, res) => {
  res.status(404).send({ message: 'Введенный URL не найден в роутах сайта' });
});

app.listen(PORT, () => {
  console.log(PORT);
});

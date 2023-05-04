/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const path = require('path');
const validationErrors = require('celebrate').errors;
const cookieParser = require('cookie-parser');

const { regExpURLAddress } = require('./utils/regExpURLAddress');

const app = express();
const { PORT = 3000 } = process.env;

app.use(express.json());
app.use(cookieParser());
app.use(helmet());



const DATABASE = 'localhost:27017/mestodb';
// handleAllErrors


mongoose
  // .connect(`mongodb://${DATABASE}`)
  .connect(`mongodb://localhost:27017/mestodb`
  .then(() => {
    console.log(`Подключение к БД '${DATABASE}' прошло успешно`);
  })
  .catch((err) => {
    console.log(
      `Подключение к БД '${DATABASE}' неудачное! Проверьте на ошибки - ${err}`
    );
  });

// app.use(express.static(path.join(__dirname, 'public')));

const { routerUser } = require('./routes/users');
const { routerCard } = require('./routes/cards');
const { routerSignIn } = require('./routes/singin');
const { routerSignUp } = require('./routes/singup');
const { routerNotFound } = require('./routes/errorNotFound');


rootRouter.use('/signin', routerSignIn);
rootRouter.use('/signup', routerSignUp);
rootRouter.use('/users', auth, routerUser);
rootRouter.use('/cards', auth, routerCard);
rootRouter.use('*', routerNotFound);

app.use(validationErrors());
app.use(errors);


app.listen(PORT, () => {
  console.log(PORT);
});

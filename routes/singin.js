const routerSignIn = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { login } = require('../controllers/users');

routerSignIn.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

module.exports = routerSignIn;

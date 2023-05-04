/* eslint-disable quotes */

const routerUser = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers,
  getUser,
  updateUser,
  updateUserAvatar,
  // getUserInfo,
} = require('../controllers/users');

routerUser.get('/', getUsers);

routerUser.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().required().length(24),
    }),
  }),
  getUser,
);

// routerUser.post("/", createUser);

routerUser.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateUser,
);

// routerUser.get("/me", getUserInfo);

routerUser.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required(),
    }),
  }),
  updateUserAvatar,
);

module.exports = { routerUser };

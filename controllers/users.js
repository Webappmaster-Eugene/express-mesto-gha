/* eslint-disable object-curly-newline */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
// eslint-disable-next-line quotes

const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const User = require('../models/user');

const { CREATE_SUCCESS_CODE } = require('../utils/goodResponseCodes');
const {
  ERROR_NOT_CORRECT_VALUE_400,
  ERROR_NOT_FOUND_404,
} = require('../utils/errors');

const { NODE_ENV, SECRET_KEY } = process.env;

const { handlerErrors, handlerOk } = require('../utils/errorHandlers');

const getUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find({});

    return handlerOk(allUsers, res);
  } catch (err) {
    // return handlerErrors(res, err);
    // return res.status(500).send({ message: err.message });
    return next(err);
  }
};

async function getUser(req, res, next) {
  try {
    const user = await User.findById(req.params.userId);

    return handlerOk(user, res);
  } catch (err) {
    // return handlerErrors(res, err);
    return next(err);
  }
}

// const login = async (req, res, next) => {
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res
        .message(401)
        .send({ message: 'Вы ввели несуществующий email' });
    }

    const result = bcrypt.compare(password, user.password);
    if (!result) {
      return res.message(401).send({ message: 'Вы ввели неправильный пароль' });
    }

    const payload = user._id;

    const token = JWT.sign(
      { payload },
      NODE_ENV === 'production' ? SECRET_KEY : 'secretkey',
      {
        expiresIn: '7d',
      },
    );

    res.cookie('jwt', token, {
      maxAge: 3600000 * 24 * 7,
      httpOnly: true,
      sameSite: true,
    });
    return res.send({ message: 'Успешный вход' });

    // const cookie = res.cookie("jwt", token, {
    //   httpOnly: true,
    //   sameSite: "strict",
    // });

    // res.cookie('jwt', token, {
    //   httpOnly: true,
    //   sameSite: 'strict',
    // });

    // return res.status(200).send({ token });
    // return handlerOk({}, res);
  } catch (err) {
    // return handlerErrors(res, err);
    // return res.status(500).send({ message: err.message });
    return next(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(ERROR_NOT_FOUND_404).send({
        message: 'Не отправлено тело запроса для POST-создания пользователя',
      });
    }

    const { name, email, password, about, avatar } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    if (!password || !email) {
      res.status(ERROR_NOT_CORRECT_VALUE_400).send({
        message: 'Электронная почта и пароль обязательны для заполения',
      });
    }

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      about,
      avatar,
    });

    if (newUser) {
      return res.status(CREATE_SUCCESS_CODE).send({ data: newUser });
    }

    return handlerOk(newUser, res);
  } catch (err) {
    // return handlerErrors(res, err);
    return next(err);
  }
};

const updateUser = async (req, res) => {
  try {
    const owner = req.user._id;
    const { name, about } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      owner,
      {
        name,
        about,
      },
      { new: true, runValidators: true },
    );

    return handlerOk(updatedUser, res);
  } catch (err) {
    return handlerErrors(res, err);
  }
};

const updateUserAvatar = async (req, res) => {
  try {
    const owner = req.user._id;
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      owner,
      {
        avatar,
      },
      { new: true, runValidators: true },
    );

    return handlerOk(user, res);
  } catch (err) {
    return handlerErrors(res, err);
  }
};

module.exports = {
  getUsers,
  getUser,
  login,
  createUser,
  updateUser,
  updateUserAvatar,
};

/* eslint-disable object-curly-newline */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
// eslint-disable-next-line quotes

const bcrypt = require("bcrypt");
const User = require("../models/user");
const { handlerErrors, handlerOk } = require("../utils/errorHandlers");

const getUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});

    return handlerOk(allUsers, res);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

async function getUser(req, res) {
  try {
    const user = await User.findById(req.params.userId);

    return handlerOk(user, res);
  } catch (err) {
    return handlerErrors(res, err);
  }
}

const createUser = async (req, res) => {
  if (!req.body) {
    return res
      .status(404)
      .send({
        message: "Не отправлено тело запроса для POST-создания пользователя",
      });
  }

  const { name, email, password, about, avatar } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  if (!password || !email) {
    res.status(400).send({
      message: "Электронная почта и пароль обязательны для заполения",
    });
  }
  try {
    const newUser = await User.create({
      name,
      email,
      hashedPassword,
      about,
      avatar,
    });

    if (newUser) {
      return res.status(201).send({ data: newUser });
    }

    return handlerOk(newUser, res);
  } catch (err) {
    return handlerErrors(res, err);
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
      { new: true, runValidators: true }
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
      { new: true, runValidators: true }
    );

    return handlerOk(user, res);
  } catch (err) {
    return handlerErrors(res, err);
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateUserAvatar,
};

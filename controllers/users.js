/* eslint-disable no-underscore-dangle */
/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
// eslint-disable-next-line quotes

const User = require("../models/user");
const { handlerErrors, handlerOk } = require("../utils/errorHandlers");

const getUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});
    // if (allUsers.length !== 0) {
    //   return res.send(allUsers);
    // }
    return handlerOk(allUsers, res);
    // return res.send({ message: "Массив пользователй пуст" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

async function getUser(req, res) {
  try {
    const user = await User.findById(req.params.userId);
    return handlerOk(user, res);
  } catch (err) {
    return handlerErrors(err, res);
  }
}

const createUser = async (req, res) => {
  const { name, about, avatar } = req.body;

  try {
    const newUser = await User.create({ name, about, avatar });
    return handlerOk(newUser, res);
  } catch (err) {
    return handlerErrors(err, res);
  }
};

const updateUser = async (req, res) => {
  try {
    const owner = req.user._id;
    const thisUser = User.find({ owner });
    const { name = thisUser.name, about = thisUser.about } = req.body;
    const updatedUser = await User.findByIdAndUpdate(owner, {
      name,
      about,
    });
    return handlerOk(updatedUser, res);
  } catch (err) {
    return handlerErrors(err, res);
  }
};

const updateUserAvatar = async (req, res) => {
  try {
    const owner = req.user._id;
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(owner, {
      avatar,
    });

    return handlerOk(user, res);
  } catch (err) {
    return handlerErrors(err, res);
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateUserAvatar,
};

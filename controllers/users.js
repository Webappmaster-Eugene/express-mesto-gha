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
    return handlerErrors(err, res);
  }
}

// const createUser = async (req, res) => {
//   const { name, about, avatar } = req.body;
//   try {
//     const newUser = await User.create({ name, about, avatar });
//     if (newUser) {
//       return res.status(201).send({ data: newUser });
//     }

//     throw new Error("ошибка");
//   } catch (err) {
//     return handlerErrors(err, res);
//   }
// };

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      res.status(201).send({ data: user });
    })
    .catch((err) => {
      handlerErrors(res, err);
    });
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

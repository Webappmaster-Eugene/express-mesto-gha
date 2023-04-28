/* eslint-disable no-underscore-dangle */
/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
// eslint-disable-next-line quotes

const User = require("../models/user");

const getUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});
    if (allUsers.length !== 0) {
      return res.send(allUsers);
    }

    return res.send({ message: "Массив пользователй пуст" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

async function getUser(req, res) {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res
        .status(404)
        .send({ message: "Пользователь с таким id не найден." });
    }
    return res.send(user);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({
          message: "При создании юзера переданы некорректные данные",
        });
      }
      return res.status(500).send({ message: err.message });
    });
};

const updateUser = async (req, res) => {
  try {
    const owner = req.user._id;
    const {
      name = User.find({ owner }).name,
      about = User.find({ owner }).about,
    } = req.body;
    const user = await User.findByIdAndUpdate(owner, {
      name,
      about,
    });
    if (user) {
      return res.status(200).send({ data: user });
    }

    return res
      .status(404)
      .send({ message: "Пользователь с таким id не найден." });
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).send({
        message: "При изменении юзера переданы некорректные данные",
      });
    }

    return res.status(500).send({ message: err.message });
  }
};

const updateUserAvatar = async (req, res) => {
  try {
    const owner = req.user._id;
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(owner, {
      avatar,
    });

    if (user) {
      return res.status(200).send({ data: user });
    }

    return res
      .status(404)
      .send({ message: "Пользователь с таким id не найден." });
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).send({
        message: "При изменении аватара переданы некорректные данные",
      });
    }

    return res.status(500).send({ message: err.message });
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateUserAvatar,
};

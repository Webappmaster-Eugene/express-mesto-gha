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

const getUser = (req, res) => {
  const id = req.params.userId;

  User.findById(id)

    .then((user) => {
      handlerOk(user, res);
    })
    .catch((err) => {
      handlerErrors(res, err);
    });
};

// async function getUser(req, res) {
//   try {
//     const user = await User.findById(req.params.userId);

//     return handlerOk(user, res);
//   } catch (err) {
//     return handlerErrors(res, err);
//   }
// }

// const createUser = async (req, res) => {
//   const { name, about, avatar } = req.body;
//   try {
//     const newUser = await User.create({ name, about, avatar });
//     if (newUser) {
//       return res.status(201).send({ data: newUser });
//     }

//     throw new Error("ошибка");
//   } catch (err) {
//     return handlerErrors(res, err);
//   }
// };

// Почему этот код проходит, а тот, что выше через async/await нет? Помогите ПОЖАЛУЙСТА!
// Почему этот код проходит, а тот, что выше через async/await нет? Помогите ПОЖАЛУЙСТА!
// Почему этот код проходит, а тот, что выше через async/await нет? Помогите ПОЖАЛУЙСТА!

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
    // const thisUser = await User.find({ owner });
    // const { name = thisUser.name, about = thisUser.about } = req.body;
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

// const updateUser = (req, res) => {
//   const { name, about } = req.body;
//   const id = req.params.userId;

//   User.findByIdAndUpdate(
//     id,
//     { name, about },
//     { new: true, runValidators: true }
//   )

//     .then((user) => {
//       handlerOk(user, res);
//     })
//     .catch((err) => {
//       handlerErrors(res, err);
//     });
// };

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

// const updateUserAvatar = (req, res) => {
//   const { avatar } = req.body;
//   const id = req.params.userId;

//   User.findByIdAndUpdate(id, { avatar }, { new: true, runValidators: true })

//     .then((user) => {
//       handlerOk(user, res);
//     })
//     .catch((err) => {
//       handlerErrors(res, err);
//     });
// };

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateUserAvatar,
};

/* eslint-disable quotes */

const routerUser = require("express").Router();
const {
  getUsers,
  getUser,
  // createUser,
  updateUser,
  updateUserAvatar,
  getUserInfo,
} = require("../controllers/users");

routerUser.get("/", getUsers);

routerUser.get("/:userId", getUser);

// routerUser.post("/", createUser);

routerUser.patch("/me", updateUser);

routerUser.get("/me", getUserInfo);

routerUser.patch("/me/avatar", updateUserAvatar);

module.exports = { routerUser };

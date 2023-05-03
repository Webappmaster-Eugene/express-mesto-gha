/* eslint-disable object-curly-newline */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
// eslint-disable-next-line quotes

const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const User = require("../models/user");

const { handlerOk } = require("../utils/errorHandlers");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .message(401)
        .send({ message: "Вы ввели несуществующий email" });
    }

    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      return res.message(401).send({ message: "Вы ввели неправильный пароль" });
    }

    const authorizedUser = User.findUserByCredentials(email, password);
    const payload = authorizedUser._id;

    const token = JWT.sign(payload, "secretkey");

    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "strict",
    });
    return handlerOk({}, res);
  } catch (err) {
    // return handlerErrors(res, err);
    return res.status(500).send({ message: err.message });
  }
};

module.exports = {
  login,
};

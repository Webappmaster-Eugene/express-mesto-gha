/* eslint-disable brace-style */
/* eslint-disable quotes */

const {
  ERROR_NOT_CORRECT_VALUE,
  ERROR_NOT_FOUND,
  ERROR_AT_SERVER,
} = require("./errors");

const handlerErrors = (res, err) => {
  if (err.name === "CastError") {
    res.status(ERROR_NOT_CORRECT_VALUE).send({
      message: "Вы ввели несуществующий ID, измените параметр в строке",
    });
  } else if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map((error) => error.message)
      .join(";");
    res.status(ERROR_NOT_CORRECT_VALUE).send({ message });
  }
  // else if (err.name === 'MongoError' || err.code === 11000) {
  else if (err.name === "MongoError") {
    res
      .status(409)
      .send({
        message:
          "Данный email уже зарегистрирован. Попробуйте ввести другой адрес электронной почты",
      });
  } else {
    res
      .status(ERROR_AT_SERVER)
      .send({ message: "Ошибка на стороне сервера, проблема в железе" });
  }
};

const handlerOk = (findedObject, res) => {
  if (findedObject) {
    console.log("findedObject =>", findedObject);
    res.send({ data: findedObject });
  } else {
    console.log("not found =>", findedObject);
    res.status(ERROR_NOT_FOUND).send({
      message: "Пользователь (карточка) с таким id не найдены!",
    });
  }
};

module.exports = { handlerErrors, handlerOk };

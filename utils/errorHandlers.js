/* eslint-disable brace-style */
/* eslint-disable quotes */

const {
  ERROR_NOT_CORRECT_VALUE_400,
  ERROR_NOT_FOUND_404,
  ERROR_AT_SERVER_500,
  ERROR_CONFLICT_409,
} = require('./errors');

const { OK_CODE } = require('./goodResponseCodes');

const handlerErrors = (res, err) => {
  if (err.name === 'CastError') {
    res.status(ERROR_NOT_CORRECT_VALUE_400).send({
      message: `Вы ввели невалидные данные, измените параметр в строке, ${err.message}`,
    });
  } else if (err.name === 'ValidationError') {
    const message = Object.values(err.errors)
      .map((error) => error.message)
      .join(';');
    res.status(ERROR_NOT_CORRECT_VALUE_400).send({ message });
  }
  // else if (err.name === 'MongoError' || err.code === 11000) {
  else if (err.name === 'MongoError') {
    res.status(ERROR_CONFLICT_409).send({
      message:
        'Данный email уже зарегистрирован. Попробуйте ввести другой адрес электронной почты',
    });
  } else {
    res
      .status(ERROR_AT_SERVER_500)
      .send({ message: 'Ошибка на стороне сервера, проблема в железеПО' });
  }
};

const handlerOk = (findedObject, res) => {
  if (findedObject) {
    // console.log('findedObject =>', findedObject);
    res.status(OK_CODE).send({ data: findedObject });
  } else {
    // console.log('not found =>', findedObject);
    res.status(ERROR_NOT_FOUND_404).send({
      message: 'Объект с таким id не найден',
    });
  }
};

module.exports = { handlerErrors, handlerOk };

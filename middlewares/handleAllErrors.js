/* eslint-disable operator-linebreak */
const { ValidationError, DocumentNotFoundError, CastError } =
  require('mongoose').Error;

const ErrorAutorization = require('../errors/ErrorAutorization');
const ErrorForbidden = require('../errors/ErrorForbidden');
const ErrorNotFound = require('../errors/ErrorNotFound');

const {
  ERROR_NOT_CORRECT_VALUE_400,
  ERROR_NOT_FOUND_404,
  ERROR_AT_SERVER_500,
  ERROR_CONFLICT_409,
} = require('../utils/errors');

module.exports = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    const errorMessage = Object.values(err.errors)
      .map((error) => error.message)
      .join(' ');
    return res.status(ERROR_NOT_CORRECT_VALUE_400).send({
      message: `Переданы некорректные данные. ${errorMessage}`,
    });
  }
  if (err instanceof DocumentNotFoundError) {
    return res.status(ERROR_NOT_FOUND_404).send({
      message: 'В базе данных не найден документ с таким ID',
    });
  }
  if (err instanceof CastError) {
    return res.status(ERROR_NOT_CORRECT_VALUE_400).send({
      message: `Передан некорректный ID: ${err.value}`,
    });
  }
  if (
    err instanceof ErrorAutorization ||
    err instanceof ErrorForbidden ||
    err instanceof ErrorNotFound
  ) {
    return res.status(err.statusCode).send({
      message: err.message,
    });
  }

  if (err.code === 11000) {
    return res.status(ERROR_CONFLICT_409).send({
      message:
        'Указанный email уже зарегистрирован. Пожалуйста используйте другой email',
    });
  }
  res.status(ERROR_AT_SERVER_500).send({
    message: `Произошла неизвестная ошибка ${err.name}: ${err.message}`,
  });
  return next();
};

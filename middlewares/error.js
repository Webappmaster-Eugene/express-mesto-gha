const {
  ValidationError,
  DocumentNotFoundError,
  CastError,
} = require('mongoose').Error;

// const ErrorAutorization = require('../errors/ErrorAutorization');
// const ErrorForbidden = require('../errors/ErrorForbidden');
// const ErrorNotFound = require('../errors/ErrorNotFound');

const {
  BAD_REQUEST_CODE,
  CONFLICT_CODE,
  NOT_FOUND_CODE,
  DEFAULT_CODE,
} = require('../utils/constants');

module.exports = ((err, req, res, next) => {
  if (err instanceof ValidationError) {
    const errorMessage = Object.values(err.errors).map((error) => error.message).join(' ');
    return res.status(BAD_REQUEST_CODE).send({
      message: `Переданы некорректные данные. ${errorMessage}`,
    });
  }
  if (err instanceof DocumentNotFoundError) {
    return res.status(NOT_FOUND_CODE).send({
      message: 'В базе данных не найден документ с таким ID',
    });
  }
  if (err instanceof CastError) {
    return res.status(BAD_REQUEST_CODE).send({
      message: `Передан некорректный ID: ${err.value}`,
    });
  }
  // if (err instanceof ErrorAutorization || err instanceof ErrorForbidden || err instanceof ErrorNotFound) {
  //   return res.status(err.statusCode).send({
  //     message: err.message,
  //   });
  // }
  if (err.statusCode) {
    return res.status(err.statusCode).send({
      message: err.message,
    });
  }
  if (err.code === 11000) {
    return res.status(CONFLICT_CODE).send({
      message: 'Указанный email уже зарегистрирован. Пожалуйста используйте другой email',
    });
  }
  res.status(DEFAULT_CODE).send({
    message: `Произошла неизвестная ошибка ${err.name}: ${err.message}`,
  });
  return next();
});

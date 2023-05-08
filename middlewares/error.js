const { ValidationError, DocumentNotFoundError, CastError } =
  require('mongoose').Error;

const { ErrorForbidden } = require('../errors/ErrorForbidden');
const { ErrorNotFound } = require('../errors/ErrorNotFound');
const { ErrorAtAuthorizationEr } = require('../errors/ErrorAutorization');

const {
  BAD_REQUEST_ERROR,
  NOT_FOUND_ERROR,
  CONFLICT_ERROR,
  SERVER_ERROR,
} = require('../utils/responseCodes');

const errors = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    const errorMessage = Object.values(err.errors)
      .map((error) => error.message)
      .join(' ');
    return res.status(BAD_REQUEST_ERROR).send({
      message: `Переданы некорректные данные. ${errorMessage}`,
    });
  }
  if (err instanceof DocumentNotFoundError) {
    return res.status(NOT_FOUND_ERROR).send({
      message: 'В базе данных не найден документ с таким ID',
    });
  }
  if (err instanceof CastError) {
    return res.status(BAD_REQUEST_ERROR).send({
      message: `Передан некорректный ID: ${err.value}`,
    });
  }
  if (
    err instanceof ErrorAtAuthorizationEr ||
    err instanceof ErrorForbidden ||
    err instanceof ErrorNotFound
  ) {
    return res.status(err.statusCode).send({
      message: err.message,
    });
  }

  if (err.code === 11000) {
    return res.status(CONFLICT_ERROR).send({
      message:
        'Указанный email уже зарегистрирован. Пожалуйста используйте другой email',
    });
  }
  res.status(SERVER_ERROR).send({
    message: `Произошла неизвестная ошибка ${err.name}: ${err.message}`,
  });
  return next();
};

module.exports = { errors };

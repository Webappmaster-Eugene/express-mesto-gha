const { ErrorNotFound } = require('../errors/ErrorNotFound');

const notFound = (req, res, next) => {
  next(new ErrorNotFound('Указан несуществующий URL'));
};

module.exports = { notFound };

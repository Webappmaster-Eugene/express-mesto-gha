const ErrorNotFound = require('../errors/ErrorNotFound');

const notFound = (req, res, next) => {
  next(new ErrorNotFound('Введенный URL не найден в роутах сайта'));
};

module.exports = {
  notFound,
};

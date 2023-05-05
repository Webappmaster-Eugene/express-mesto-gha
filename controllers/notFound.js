// IMPORT VARIABLES
const ErrorNotFound = require('../errors/ErrorNotFound');

// NOT FOUNDED ROUTE
module.exports.notFound = (req, res, next) => {
  next(new ErrorNotFound('Указан несуществующий URL'));
};

const { ERROR_NOT_FOUND_404 } = require('../utils/errors');

// AUTHORIZATION ERROR
class ErrorNotFound extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_NOT_FOUND_404;
  }
}

module.exports = ErrorNotFound;

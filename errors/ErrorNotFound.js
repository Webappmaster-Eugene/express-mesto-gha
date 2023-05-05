const { NOT_FOUND_CODE } = require('../utils/constants');

// AUTHORIZATION ERROR
class ErrorNotFound extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND_CODE;
  }
}

module.exports = ErrorNotFound;

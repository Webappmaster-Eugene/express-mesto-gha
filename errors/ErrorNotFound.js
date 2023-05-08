const { NOT_FOUND_ERROR } = require('../utils/responseCodes');

class ErrorNotFound extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND_ERROR;
  }
}

module.exports = { ErrorNotFound };

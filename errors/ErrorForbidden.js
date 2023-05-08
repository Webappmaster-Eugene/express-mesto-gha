const { FORBIDDEN_ERROR } = require('../utils/responseCodes');

class ErrorForbidden extends Error {
  constructor(message) {
    super(message);
    this.statusCode = FORBIDDEN_ERROR;
  }
}

module.exports = { ErrorForbidden };

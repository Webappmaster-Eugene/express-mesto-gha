const { ERROR_FORBIDDEN_403 } = require('../utils/errors');

class ErrorForbidden extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_FORBIDDEN_403;
  }
}

module.exports = ErrorForbidden;

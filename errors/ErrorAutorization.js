const { ERROR_UNAUTHORIZED_ACCESS_401 } = require('../utils/errors');

class ErrorAuthorization extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_UNAUTHORIZED_ACCESS_401;
  }
}

module.exports = ErrorAuthorization;

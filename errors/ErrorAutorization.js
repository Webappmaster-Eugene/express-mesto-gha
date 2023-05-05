const { UNAUTHORIZED_CODE } = require('../utils/constants');

class ErrorAuthorization extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZED_CODE;
  }
}

module.exports = ErrorAuthorization;

const JWT = require('jsonwebtoken');
const { ErrorAtAuthorization } = require('../errors/ErrorAutorization');

const { NODE_ENV, SECRET_KEY } = process.env;

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(new ErrorAtAuthorization('Необходима авторизация'));
  }
  let payload;
  try {
    payload = JWT.verify(
      token,
      NODE_ENV === 'production' ? SECRET_KEY : 'dev-secret-key',
    );
  } catch (err) {
    return next(new ErrorAtAuthorization('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};

module.exports = { auth };

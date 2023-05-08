const JWT = require('jsonwebtoken');
const { ErrorAtAuthorizationEr } = require('../errors/ErrorAutorization');

const { NODE_ENV, SECRET_KEY } = process.env;

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(new ErrorAtAuthorizationEr('Необходима авторизация'));
  }
  let payload;
  try {
    payload = JWT.verify(
      token,
      NODE_ENV === 'production' ? SECRET_KEY : 'dev-secret-key',
    );
  } catch (err) {
    return next(new ErrorAtAuthorizationEr('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};

module.exports = { auth };

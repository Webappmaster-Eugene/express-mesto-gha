const JWT = require('jsonwebtoken');
const { ErrorAuthorization } = require('../errors/ErrorAutorization');

const { NODE_ENV, SECRET_KEY } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(new ErrorAuthorization('Необходима авторизация'));
  }
  let payload;
  try {
    payload = JWT.verify(
      token,
      NODE_ENV === 'production' ? SECRET_KEY : 'secretdevkey',
    );
  } catch (err) {
    return next(new ErrorAuthorization('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};

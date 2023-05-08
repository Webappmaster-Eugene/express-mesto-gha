const JWT = require('jsonwebtoken');
const { ErrorAtAuthorizationEr } = require('../errors/ErrorAutorization');

const { NODE_ENV, SECRET_KEY } = process.env;

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(
      new ErrorAtAuthorizationEr(
        'Для данных действий необходима авторизация на сайте',
      ),
    );
  }
  let payload;
  try {
    payload = JWT.verify(
      token,
      NODE_ENV === 'production' ? SECRET_KEY : 'secretdevkey',
    );
  } catch (err) {
    return next(
      new ErrorAtAuthorizationEr(
        'Для данных действий необходима авторизация на сайте',
      ),
    );
  }
  req.user = payload;
  return next();
};

module.exports = { auth };

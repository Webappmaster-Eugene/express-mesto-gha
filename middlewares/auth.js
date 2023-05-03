/* eslint-disable quotes */
const JWT = require('jsonwebtoken');

function authorize(req, res, next) {
  // const authCookies = req.cookies("jwt");

  // if (!authCookies || !authCookies.startsWith("Bearer ")) {
  //   return res.status(401).send({
  //     message: "Необходима авторизация пользователя для продолжения работы",
  //   });
  // }

  // const token = authCookies.replace("/Bearer /", "");
  // const token = authCookies.replace("Bearer ", "");
  // let payload;

  // try {
  //   payload = JWT.verify(token, "secretkey");
  // } catch (err) {
  //   return res.status(401).send({ message: "Необходима авторизация" });
  // }

  // req.user = payload;

  // return next();

  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({
      message: 'Необходима авторизация пользователя для продолжения работы',
    });
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = JWT.verify(token, 'secretkey');
  } catch (error) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }

  req.user = payload;
  return next();
}

module.exports = {
  authorize,
};

/* eslint-disable quotes */
const JWT = require("jsonwebtoken");

function authorize(req, res, next) {
  const authCookies = req.cookies("jwt");
  // const { authorizationToken } = req.headers;

  if (!authCookies || !authCookies.startsWith("Bearer ")) {
    return res.status(401).send({
      message: "Необходима авторизация пользователя для продолжения работы",
    });
  }

  // const token = authCookies.replace("/Bearer /", "");
  const token = authCookies.replace("Bearer ", "");
  let payload;

  try {
    payload = JWT.verify(token, "secretkey");
  } catch (err) {
    return res.status(401).send({ message: "Необходима авторизация" });
  }

  req.user = payload;

  return next();
}

module.exports = {
  authorize,
};

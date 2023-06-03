const { AUTHORIZATION_REQUIRED_ERROR_RU } = require('../data');
const { UnauthorizedError } = require('../errors');
const { checkToken } = require('../utils/token');

module.exports = (req, res, next) => {
  try {
    const jwtCokie = req.cookies.jwt;
    if (!jwtCokie) {
      next(new UnauthorizedError(AUTHORIZATION_REQUIRED_ERROR_RU));
      return;
    }
    const payload = checkToken(jwtCokie);
    if (!payload) {
      next(new UnauthorizedError(AUTHORIZATION_REQUIRED_ERROR_RU));
      return;
    }
    req.user = { _id: payload._id };
  } catch (err) {
    next(err);
  }
  next(); // пропускаем запрос дальше
};

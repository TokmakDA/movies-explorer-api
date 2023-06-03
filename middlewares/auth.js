const { AUTHORIZATION_REQUIRED_ERROR_RU } = require('../data');
const { UnauthorizedError } = require('../errors/errors');
const { checkToken } = require('../utils/token');

module.exports = (req, res, next) => {
  const newErr = new UnauthorizedError(AUTHORIZATION_REQUIRED_ERROR_RU);
  try {
    const jwtCokie = req.cookies.jwt;
    if (!jwtCokie) {
      next(newErr);
      return;
    }
    const payload = checkToken(jwtCokie);
    if (!payload) {
      next(newErr);
      return;
    }
    req.user = { _id: payload._id };
  } catch (err) {
    next(newErr);
  }
  next(); // пропускаем запрос дальше
};

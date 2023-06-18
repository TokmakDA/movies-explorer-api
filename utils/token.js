const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const { UnauthorizedError } = require('../errors');
const { AUTHORIZATION_REQUIRED_ERROR_RU } = require('../data');

const generateToken = (payload) => {
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: '7d',
  });
  return token;
};

const checkToken = (token) => {
  if (!token) {
    return new UnauthorizedError(AUTHORIZATION_REQUIRED_ERROR_RU);
  }
  return jwt.verify(token, JWT_SECRET);
};

module.exports = {
  generateToken,
  checkToken,
};

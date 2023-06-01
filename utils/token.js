const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const generateToken = (payload) => {
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: '7d',
  });
  return token;
};

const checkToken = (token) => {
  if (!token) {
    return false;
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return payload;
  } catch (e) {
    return false;
  }
};

module.exports = {
  generateToken,
  checkToken,
};

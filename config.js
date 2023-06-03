// require('dotenv').config();
const { JWT_SECRET_DEV, COOKIE_PARAMS, COOKIE_PARAMS_DEV } = require('./data');

const { NODE_ENV, JWT_SECRET, MONGO_URL } = process.env;

module.exports = {
  JWT_SECRET: NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV,
  MONGO_URL:
    NODE_ENV === 'production'
      ? MONGO_URL
      : 'mongodb://localhost:27017/bitfilms',
  COOKIE_PARAMS: NODE_ENV === 'production' ? COOKIE_PARAMS : COOKIE_PARAMS_DEV,
};

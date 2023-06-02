// require('dotenv').config();
const {
  JWT_SECRET_DEV,
  COOKIE_PARAMS,
  DEFAULT_ALLOWED_METHODS,
  COOKIE_PARAMS_DEV,
} = require('./constants');

const { NODE_ENV, JWT_SECRET, MONGO_URL } = process.env;

const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'localhost:3000',
  'http://localhost:3000',
  'localhost:3001',
  'http://localhost:3001',
  'http://192.168.1.212:3001',
  'http://192.168.1.212:3000',
  'tokmak-da.mesto.nomoredomains.monster',
  'https://tokmak-da.mesto.nomoredomains.monster',
  'http://tokmak-da.mesto.nomoredomains.monster',
  'api.tokmak-da.mesto.nomoredomains.rocks',
  'https://api.tokmak-da.mesto.nomoredomains.rocks',
  'http://api.tokmak-da.mesto.nomoredomains.rocks',
  'https://tokmakda.github.io',
  'http://tokmakda.github.io',
  'tokmakda.github.io',
];

const corsOptions = {
  origin: allowedCors,
  methods: DEFAULT_ALLOWED_METHODS,
  credentials: true,
};

module.exports = {
  JWT_SECRET: NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV,
  MONGO_URL:
    NODE_ENV === 'production'
      ? MONGO_URL
      : 'mongodb://localhost:27017/bitfilms',
  COOKIE_PARAMS: NODE_ENV === 'production' ? COOKIE_PARAMS : COOKIE_PARAMS_DEV,
  corsOptions,
};

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'localhost:3000',
  'http://localhost:3000',
  'localhost:3001',
  'http://localhost:3001',
  'http://192.168.1.212:3001',
  'http://192.168.1.212:3000',
  'https://api.diploma.tokmak.nomoredomains.rocks',
  'http://api.diploma.tokmak.nomoredomains.rocks',
  'http://diploma.tokmak.nomoredomains.rocks',
  'https://diploma.tokmak.nomoredomains.rocks',

  'https://diploma.1827093-cy37517.twc1.net',
  'http://diploma.1827093-cy37517.twc1.net',
  'http://api.diploma.1827093-cy37517.twc1.net',
  'https://api.diploma.1827093-cy37517.twc1.net',

  'https://diploma.e-tokmak.ru',
  'http://diploma.e-tokmak.ru',
  'http://api.diploma.e-tokmak.ru',
  'https://api.diploma.e-tokmak.ru',
  'http://e-tokmak.ru',
  'https://e-tokmak.ru',
];

const corsOptions = {
  origin: allowedCors,
  methods: DEFAULT_ALLOWED_METHODS,
  credentials: true,
};

module.exports = {
  corsOptions,
};

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
const allowedCors = [
  'https://diploma.e-tokmak.ru',
  'http://diploma.e-tokmak.ru',
  'http://api.diploma.e-tokmak.ru',
  'https://api.diploma.e-tokmak.ru',
];

const corsOptions = {
  origin: allowedCors,
  methods: DEFAULT_ALLOWED_METHODS,
  credentials: true,
};

module.exports = {
  corsOptions,
};

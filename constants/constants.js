const COOKIE_PARAMS = {
  maxAge: 3600000 * 24 * 7,
  httpOnly: true,
  sameSite: 'None',
  secure: true,
};

const COOKIE_PARAMS_DEV = {
  maxAge: 3600000 * 24 * 7,
  httpOnly: true,
};

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
const JWT_SECRET_DEV = 'dev-secret';


module.exports = {
  COOKIE_PARAMS,
  COOKIE_PARAMS_DEV,
  JWT_SECRET_DEV,
  DEFAULT_ALLOWED_METHODS,
};

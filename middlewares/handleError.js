const { default: mongoose } = require('mongoose');
const { SomeError, BadRequestError, DefaltError } = require('../errors');
const { DEFAULT_MESSAGE_ERROR_RU } = require('../data');

// Вернуть ошибку пользователю
const returnErrorToUser = (err, req, res, next) => {
  res.status(err.statusCode).send({ message: err.message }).end();
  next();
};

const handleError = (err, req, res, next) => {
  if (err instanceof SomeError) {
    returnErrorToUser(err, req, res, next);
  } else if (err instanceof mongoose.Error.ValidationError) {
    const message = Object.values(err.errors)
      .map((error) => error.message)
      .join('; ');
    returnErrorToUser(new BadRequestError(message), req, res, next);
  } else if (err instanceof mongoose.Error.CastError) {
    returnErrorToUser(new BadRequestError(err), req, res, next);
  } else {
    returnErrorToUser(
      new DefaltError(DEFAULT_MESSAGE_ERROR_RU),
      req,
      res,
      next,
    );
  }
};

module.exports = {
  handleError,
};

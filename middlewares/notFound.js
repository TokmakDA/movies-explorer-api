const { NOT_FOUND_DEFAULT_ERROR_RU } = require('../data');
const { NotFoundError } = require('../errors');

module.exports = function (req, res, next) {
  next(new NotFoundError(NOT_FOUND_DEFAULT_ERROR_RU));
}

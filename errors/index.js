const { BadRequestError } = require('./BadRequestError');
const { ConflictError } = require('./ConflictError');
const { DefaltError } = require('./DefaltError');
const { ForbiddenError } = require('./ForbiddenError');
const { NotFoundError } = require('./NotFoundError');
const { LimitterError } = require('./LimitterError');
const { UnauthorizedError } = require('./UnauthorizedError');
const SomeError = require('./SomeError');

module.exports = {
  BadRequestError,
  ConflictError,
  DefaltError,
  ForbiddenError,
  NotFoundError,
  LimitterError,
  UnauthorizedError,
  SomeError,
};

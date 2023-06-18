const rateLimit = require('express-rate-limit');
const { LimitterError } = require('../errors/LimitterError');
const { LIMITTER_ERROR_RU } = require('../data');

module.exports = rateLimit({
  windowMs: 1 * 60 * 1000, // за 1 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
  handler: (req, res, next) => {
    next(new LimitterError(LIMITTER_ERROR_RU));
  },
});

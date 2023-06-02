const rateLimit = require('express-rate-limit');
const { LimitterError } = require('../errors/LimitterError');
const { LIMITTER_RU } = require('../constants');

module.exports = rateLimit({
  windowMs: 60 * 1000, // за 1 минут
  max: 250, // можно совершить максимум 250 запросов с одного IP
  handler: (req, res, next) => {
    next(new LimitterError(LIMITTER_RU));
  },
});

const { NOT_FOUND_DEFAULT_ERROR_RU } = require('../data');
const { NotFoundError } = require('../errors');
const auth = require('../middlewares/auth');
const notFound = require('../middlewares/notFound');
const movieRouter = require('./movies');
const signRouter = require('./signing');
const userRouter = require('./users');

module.exports = require('express')
  .Router()
  .use(signRouter)
  .use(auth)
  .use('/movies', movieRouter)
  .use('/users', userRouter)
  .use(notFound); // 404 ошибка неверного пути

const auth = require('../middlewares/auth');
const movieRouter = require('./movies');
const signRouter = require('./signing');
const userRouter = require('./users');

module.exports = require('express')
  .Router()
  .use('/', signRouter)
  .use(auth)
  .use('/movies', movieRouter)
  .use('/users', userRouter);

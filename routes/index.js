const { login, createUser, signout } = require('../controllers/users');
const { NotFoundError } = require('../errors/NotFoundError');
const auth = require('../middlewares/auth');
const movieRouter = require('./movies');
const userRouter = require('./users');

module.exports = require('express')
  .Router()
  .post('/signin', login)
  .post('/signup', createUser)
  .get('/signout', signout)
  .use(auth)
  .use('/movies', movieRouter)
  .use('/users', userRouter)
  .use('*', (req, res, next) => {
    next(new NotFoundError('Not found'));
  });

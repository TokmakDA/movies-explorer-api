const { login, createUser, signout } = require('../controllers/users');
const { validateLogin, validateCreateUser } = require('../middlewares/validations');

module.exports = require('express')
  .Router()
  .post('/signin', validateLogin, login)
  .post('/signup', validateCreateUser, createUser)
  .get('/signout', signout);

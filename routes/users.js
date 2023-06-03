const { getUser, patchUser } = require('../controllers/users');
const { validateUpdateUser } = require('../middlewares/validations');

module.exports = require('express')
  .Router()
  // запрос на GET /users/me возвращает информацию о пользователе (email и имя)
  .get('/me', getUser)
  // PATCH /users/me — обновляет информацию о пользователе (email и имя)
  .patch('/me', validateUpdateUser, patchUser);

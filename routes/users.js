const { getUser, patchUser } = require('../controllers/users');

module.exports = require('express')
  .Router()
  // запрос на GET /users/me возвращает информацию о пользователе (email и имя)
  .get('/me', getUser)
  // PATCH /users/me — обновляет информацию о пользователе (email и имя)
  .patch('/me', patchUser);

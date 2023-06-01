module.exports = require('express')
  .Router()
  // запрос на GET /users/me возвращает информацию о пользователе (email и имя);
  .get('/me', getUserMe)
  // PATCH /users/me — обновляет информацию о пользователе;
  .patch('/me', patchUser)
  // GET /users/:userId - возвращает пользователя по _id
  .get('/:userId/', celebrate(userIdSchema), getUser)
  // PATCH /users/me/avatar — обновляет аватар
  .patch('/me/avatar', celebrate(userSchemaUpdateAvatat), patchAvatar);

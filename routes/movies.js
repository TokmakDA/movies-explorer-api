const { getMovies, setMovie, deleteMovie } = require('../controllers/movies');
const { validateCard, validateId } = require('../middlewares/validations');

module.exports = require('express')
  .Router()
  // GET /movies все сохранённые пользователем фильмы;
  .get('/', getMovies)
  // POST /movies создаёт фильм с переданными в теле данными;
  .post('/', validateCard, setMovie)
  // DELETE /movies/_id удаляет сохранённый фильм по _id;
  .delete('/:_id', validateId, deleteMovie);

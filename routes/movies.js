const { getMovies, setMovie, deleteMovie } = require('../controllers/movies');

module.exports = require('express').Router()
// GET /movies все сохранённые пользователем фильмы;
.get('/', getMovies)
// POST /movies создаёт фильм с переданными в теле данными;
.post('/', setMovie)
// DELETE /movies/_id удаляет сохранённый фильм по _id;
.delete('/:_id', deleteMovie)

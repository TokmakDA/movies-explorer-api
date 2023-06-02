const Movie = require('../models/movie');
const {
  ForbiddenError,
  NotFoundError,
  ConflictError,
} = require('../errors/errors');
// const { messageOk } = require('../constants/constants');
const {
  CONFLICT_CARD_MOVIE_RU,
  NOT_FOUND_CARD_MOVIE_RU,
  FORBIDDEN_CARD_MOVIE_RU,
} = require('../constants');

// GET /movies все сохранённые пользователем фильмы (по user._id);
const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .populate(['owner'])
    .then((movies) => {
      res.json({ data: movies });
    })
    .catch(next);
};

// POST /movies создаёт фильм с переданными в теле данными;
const setMovie = async (req, res, next) => {
  const dataCard = {
    movieId: req.body.movieId,
    nameRU: req.body.nameRU,
    nameEN: req.body.nameEN,
    director: req.body.director,
    country: req.body.country,
    year: req.body.year,
    duration: req.body.duration,
    description: req.body.description,
    trailerLink: req.body.trailerLink,
    image: req.body.image,
    thumbnail: req.body.thumbnail,
    owner: req.user._id,
  };
  try {
    const checkMovie = await Movie.findOne({
      movieId: dataCard.movieId,
      owner: dataCard.owner,
    });
    if (!checkMovie) {
      const newMovie = await Movie.create(dataCard);
      const movie = await newMovie.populate(['owner']);
      return res.status(201).json({ data: movie });
    } else {
      throw new ConflictError(CONFLICT_CARD_MOVIE_RU);
    }
  } catch (err) {
    next(err);
  }
};

// DELETE /movies/_id удаляет сохранённый фильм по _id;
const deleteMovie = async (req, res, next) => {
  const { _id } = req.params;
  try {
    const movie = await Movie.findById(_id)
      .populate(['owner'])
      .orFail(() => {
        throw new NotFoundError(NOT_FOUND_CARD_MOVIE_RU);
      });

    if (movie.owner._id.toString() === req.user._id.toString()) {
      console.log(
        'deleteMovie => deleteMovie =   return deleteMovie.deleteOne()',
      );
      const deletedMovie = await movie.deleteOne();
      if (deletedMovie) {
        return res.json({
          message: `Карточка с фильмом id: ${_id} успешно удалена`,
        });
      } else {
        console.log(
          'deleteMovie => deleteOne => Что-то пошло не так. Проверяй',
          deletedMovie,
        );
        next();
      }
    }
    throw new ForbiddenError(FORBIDDEN_CARD_MOVIE_RU);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMovies,
  setMovie,
  deleteMovie,
};

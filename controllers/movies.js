const Movie = require('../models/movie');
const {
  ForbiddenError,
  NotFoundError,
  ConflictError,
  DefaltError,
} = require('../errors');
// const { messageOk } = require('../constants/constants');
const {
  CONFLICT_MOVIE_CARD_ERROR_RU,
  NOT_FOUND_MOVIE_CARD_ERROR_RU,
  FORBIDDEN_MOVIE_CARD_ERROR_RU,
  DEFAULT_MESSAGE_ERROR_RU,
  MESSAGE_MOVIE_CARD_DELETED_RU,
} = require('../data');

// GET /movies все сохранённые пользователем фильмы (по user._id);
const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({ owner: req.user._id }).populate([
      'owner',
    ]);
    res.json({ data: movies });
    return;
  } catch (err) {
    next(err);
  }
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
      res.status(201).json({ data: movie });
      return;
    }
    next(new ConflictError(CONFLICT_MOVIE_CARD_ERROR_RU));
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
        next(new NotFoundError(NOT_FOUND_MOVIE_CARD_ERROR_RU));
      });

    if (movie.owner._id.toString() !== req.user._id.toString()) {
      next(new ForbiddenError(FORBIDDEN_MOVIE_CARD_ERROR_RU));
    } else {
      const deletedMovie = await movie.deleteOne();
      if (deletedMovie) {
        res.json({
          message: MESSAGE_MOVIE_CARD_DELETED_RU,
        });
        return;
      }
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMovies,
  setMovie,
  deleteMovie,
};

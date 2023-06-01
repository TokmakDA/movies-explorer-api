const Movie = require('../models/movie');
const { ForbiddenError, NotFoundError } = require('../errors/errors');

// Внести изменения в данных пользователя из базы по ID
const setFindByIdAndUpdate = async (id, update) => {
  const card = await Movie.findByIdAndUpdate(id, update, {
    new: true,
  })
    .populate(['owner', 'likes'])
    .orFail(() => {
      throw new NotFoundError(`Карточка ${id} не найдена`);
    });
  return card;
};

// GET /movies все сохранённые пользователем фильмы;
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
  const { name, link } = req.body;
  const userId = req.user._id;
  try {
    const newCard = await Card.create({ name, link, owner: userId });
    const card = await newCard.populate(['owner']);
    return res.status(201).json({ data: card });
  } catch (err) {
    next(err);
  }
};

// DELETE /movies/_id удаляет сохранённый фильм по _id;
const deleteMovie = (req, res, next) => {
  const { _id } = req.params;

  Movie.findById(_id)
    .populate(['owner'])
    .orFail(() => {
      throw new NotFoundError(`Фильм ${_id} не найден`);
    })
    .then((card) => {
      if (card.owner._id.toString() === req.user._id.toString()) {
        console.log('deleteCard => card =   return card.deleteOne()');
        return card.deleteOne().then(() => {
          res.json({
            message: `Карточка с id: ${cardId} успешно удалена`,
          });
        });
      }
      throw new ForbiddenError(
        `Вы не являетесь владельцем карточки id: ${cardId}`,
      );
    })
    .catch(next);
};

//  PUT /cards/:cardId/likes — поставить лайк карточке
const addLikeCard = (req, res, next) => {
  const { cardId } = req.params;
  // добавить _id в массив, если его там нет
  setFindByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id } })
    .then((card) => {
      res.json({ data: card });
    })
    .catch(next);
};

//  DELETE /cards/:cardId/likes — убрать лайк с карточки
const deleteLikeCard = (req, res, next) => {
  const { cardId } = req.params;
  // убрать _id из массива
  setFindByIdAndUpdate(cardId, { $pull: { likes: req.user._id } })
    .then((card) => {
      res.json({ data: card });
    })
    .catch(next);
};

module.exports = {};

const bcrypt = require('bcrypt');
const User = require('../models/user');
const { NotFoundError, ConflictError } = require('../errors/errors');
// const { generateToken } = require('../utils/token');
const { generateToken } = require('../utils/token');
const { COOKIE_PARAMS } = require('../config');

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

// Получить пользователя из базы по ID
// Если имеем данные для изменения, то внести их
const findUserById = async (id, data) => {
  const user = await (data
    ? User.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      })
    : User.findById(id)
  ).orFail(() => {
    throw new NotFoundError(`Пользователь ${id} не найден`);
  });
  // выберем нужные поля для возврата пользователю
  const dataUser = {
    _id: user._id,
    name: user.name,
    email: user.email,
  };
  return dataUser;
};

const getUserId = (req) => {
  const { _id } = req.user;
  return _id;
};

//  POST /signup — создаёт пользователя
const createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      User.create({
        email,
        password: hash,
        name,
      })
        .then((user) => {
          // выбираем данные для передачи пользователю
          res.status(201).json({
            data: {
              _id: user._id,
              email: user.email,
              name: user.name,
            },
          }); // вернем данные
        })
        .catch((err) => {
          if (err.code === 11000) {
            next(
              new ConflictError(
                'Пользователь с введенным Вами Email уже существует',
              ),
            );
          } else {
            next(err);
          }
        });
    })
    .catch(next);
};

//  GET /users/me - возвращает информацию о пользователе (email и имя)
const getUser = (req, res, next) => {
  findUserById(getUserId(req))
    .then((user) => {
      res.json({ data: user });
    })
    .catch(next);
};

// PATCH /users/me — обновляет информацию о пользователе (email и имя)
const patchUser = (req, res, next) => {
  const { name, email } = req.body;
  findUserById(getUserId(req), { name, email })
    .then((user) => {
      res.json({ data: user });
    })
    .catch(next);
};

//  POST /signin — авторизует пользователя
const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const { _id } = user;
      const token = generateToken({ _id }); // сгенерировали токен
      // вернём токен пользователю
      res
        .cookie('jwt', token, COOKIE_PARAMS)
        .status(200)
        .json({
          data: {
            _id: user._id,
            name: user.name,
            email: user.email,
          },
        });
    })
    .catch(next);
};

//  GET /signout — очищает куки
const signout = (req, res) => {
  res.clearCookie('jwt', COOKIE_PARAMS).send({ message: 'Exit' });
};

module.exports = {
  createUser,
  login,
  signout,
  getUser,
  patchUser,
};

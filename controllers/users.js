const bcrypt = require('bcrypt');
const User = require('../models/user');
const { NotFoundError, ConflictError } = require('../errors');
const { generateToken } = require('../utils/token');
const { COOKIE_PARAMS } = require('../config');
const {
  NOT_FOUND_USER_CARD_ERROR_RU,
  CONFLICT_USER_CARD_ERROR_RU,
  MESSAGE_EXIT_RU,
} = require('../data');

// Получить пользователя из базы по ID
// Если имеем данные для изменения, то внести их
const findUserById = async (req, res, next, data) => {
  try {
    const id = req.user._id;
    const user = await (data
      ? User.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      })
      : User.findById(id)
    ).orFail(() => {
      next(new NotFoundError(NOT_FOUND_USER_CARD_ERROR_RU));
    });
    // выберем нужные поля для возврата пользователю
    const dataUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };
    res.json({ data: dataUser });
  } catch (err) {
    next(err);
  }
};

//  GET /users/me - возвращает информацию о пользователе (email и имя)
const getUser = (req, res, next) => {
  findUserById(req, res, next);
};

// PATCH /users/me — обновляет информацию о пользователе (email и имя)
const patchUser = (req, res, next) => {
  const { name, email } = req.body;
  findUserById(req, res, next, { name, email });
};

//  POST /signup — создаёт пользователя
const createUser = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hash,
      name,
    });
    // вернем данные
    res.status(201).json({
      data: {
        _id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (err) {
    if (err.code === 11000) {
      next(new ConflictError(CONFLICT_USER_CARD_ERROR_RU));
    } else {
      next(err);
    }
  }
};

//  POST /signin — авторизует пользователя
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findUserByCredentials(email, password);
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
  } catch (err) {
    next(err);
  }
};

//  GET /signout — очищает куки
const signout = (req, res) => {
  res.clearCookie('jwt', COOKIE_PARAMS).json({ message: MESSAGE_EXIT_RU });
};

module.exports = {
  createUser,
  login,
  signout,
  getUser,
  patchUser,
};

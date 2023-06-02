const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { UnauthorizedError } = require('../errors/errors');
const validateMongo = require('../utils/validateMongo');
const { AUTHORIZATION_WRONG_RU, mongoMessage } = require('../constants');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, mongoMessage.maxlength],
      unique: true,
      validate(value) {
        validateMongo.validateEmail(value);
      },
    },
    password: {
      type: String,
      required: [true, mongoMessage.maxlength],
      select: false,
    },
    name: {
      type: String,
      required: [true, mongoMessage.required],
      minlength: [2, mongoMessage.minlength],
      maxlength: [30, mongoMessage.maxlength],
    },
  },
  { versionKey: false },
);

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password') // this — это модель User
    .then((user) => {
      // не нашёлся — отклоняем промис
      if (!user) {
        return Promise.reject(new UnauthorizedError(AUTHORIZATION_WRONG_RU));
      }
      // нашёлся — сравниваем хеши
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new UnauthorizedError(AUTHORIZATION_WRONG_RU));
        }
        return user; // вернем user
      });
    });
};

module.exports = mongoose.model('user', userSchema);

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { UnauthorizedError } = require('../errors/errors');
const { validateScheme, messageSchemes } = require('../utils/validateMongoScheme');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, messageSchemes.maxlength],
      unique: true,
      validate(value) {
        validateScheme.validateEmail(value);
      },
    },
    password: {
      type: String,
      required: [true, messageSchemes.maxlength],
      select: false,
    },
    name: {
      type: String,
      required: [true, messageSchemes.required],
      minlength: [2, messageSchemes.minlength],
      maxlength: [30, messageSchemes.maxlength],
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
        return Promise.reject(
          new UnauthorizedError('Неправильные почта или пароль'),
        );
      }
      // нашёлся — сравниваем хеши
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new UnauthorizedError('Неправильные почта или пароль'),
          );
        }
        return user; // вернем user
      });
    });
};

module.exports = mongoose.model('user', userSchema);

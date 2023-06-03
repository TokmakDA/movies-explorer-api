const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { UnauthorizedError } = require('../errors/errors');
const { AUTHORIZATION_WRONG_ERROR_RU, mongoMessage } = require('../data');
const { validateMongoEmail } = require('../middlewares/validations');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, mongoMessage.maxlength],
      unique: true,
      validate(value) {
        validateMongoEmail(value);
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

userSchema.statics.findUserByCredentials = async function (email, password) {
  // проверяем, существует ли пользователь
  const userExists = await this.findOne({ email }).select('+password');
  if (!userExists) {
    throw new UnauthorizedError(AUTHORIZATION_WRONG_ERROR_RU);
  }
  // проверяем введенный пароль
  const isPassword = await bcrypt.compare(password, userExists.password);
  if (isPassword) {
    throw new UnauthorizedError(AUTHORIZATION_WRONG_ERROR_RU);
  }
  return userExists; // вернем пользователя
};

module.exports = mongoose.model('user', userSchema);

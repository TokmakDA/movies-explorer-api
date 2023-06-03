const { Joi, celebrate } = require('celebrate');
const validator = require('validator');
const { validatorMessage } = require('../data');
const { mongoMessage } = require('../data');

const validateMongoURL = (value) => {
  if (!validator.isURL(value)) {
    throw new Error(mongoMessage.validateURL);
  }
};
const validateMongoEmail = (value) => {
  if (!validator.isEmail(value)) {
    throw new Error(mongoMessage.validateEmail);
  }
};

const userConfig = {
  name: Joi.string()
    .min(2)
    .max(30)
    .label('Имя')
    .messages(validatorMessage),
  email: Joi.string()
    .email()
    .required()
    .label('Email')
    .messages(validatorMessage),
  password: Joi.string()
    .min(8)
    .required()
    .label('Пароль')
    .messages(validatorMessage),
};

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.messages(validatorMessage);
};

const validateCreateUser = celebrate({
  body: Joi.object().keys(userConfig),
});
const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: userConfig.name,
    email: userConfig.name,
  }),
});
const validateLogin = celebrate({
  body: Joi.object().keys({
    email: userConfig.email,
    password: userConfig.password,
  }),
});

const validateId = celebrate({
  params: Joi.object().keys({
    _id: Joi.string()
      .hex()
      .length(24)
      .required()
      .label('ID')
      .messages(validatorMessage),
  }),
});

const validateCard = celebrate({
  body: Joi.object().keys({
    movieId: Joi.number()
      .required()
      .label('movieId')
      .messages(validatorMessage),
    nameRU: Joi.string()
      .required()
      .label('nameRU')
      .messages(validatorMessage),
    nameEN: Joi.string()
      .required()
      .label('nameEN')
      .messages(validatorMessage),
    director: Joi.string()
      .required()
      .label('director')
      .messages(validatorMessage),
    country: Joi.string()
      .required()
      .label('country')
      .messages(validatorMessage),
    year: Joi.string()
      .required()
      .label('year')
      .messages(validatorMessage),
    duration: Joi.number()
      .required()
      .label('duration')
      .messages(validatorMessage),
    description: Joi.string()
      .required()
      .label('year')
      .messages(validatorMessage),
    trailerLink: Joi.string()
      .required()
      .label('trailerLink')
      .custom((value, helpers) => validateURL(value, helpers))
      .messages(validatorMessage),
    image: Joi.string()
      .required()
      .label('image')
      .custom((value, helpers) => validateURL(value, helpers))
      .messages(validatorMessage),
    thumbnail: Joi.string()
      .required()
      .label('image')
      .custom((value, helpers) => validateURL(value, helpers))
      .messages(validatorMessage),
  }),
});

module.exports = {
  validateCreateUser,
  validateUpdateUser,
  validateLogin,
  validateId,
  validateCard,
  validateMongoURL,
  validateMongoEmail,
};

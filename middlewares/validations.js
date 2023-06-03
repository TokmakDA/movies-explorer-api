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

const cardConfig = {
  pathNumber: Joi.number()
    .required()
    .messages(validatorMessage),
  pathString: Joi.string()
    .required()
    .messages(validatorMessage),
  pathLink: Joi.string()
    .required()
    .custom((value, helpers) => validateURL(value, helpers))
    .messages(validatorMessage),
};

const validateCreateUser = celebrate({
  body: Joi.object().keys(userConfig),
});
const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: userConfig.name,
    email: userConfig.name,
  }).messages(validatorMessage),
});
const validateLogin = celebrate({
  body: Joi.object().keys({
    email: userConfig.email,
    password: userConfig.password,
  }).messages(validatorMessage),
});

const validateId = celebrate({
  params: Joi.object().keys({
    _id: Joi.string()
      .hex()
      .length(24)
      .required()
      .label('ID')
      .messages(validatorMessage),
  }).messages(validatorMessage),
});

const validateCard = celebrate({
  body: Joi.object().keys({
    movieId: cardConfig.pathNumber,
    nameRU: cardConfig.pathString,
    nameEN: cardConfig.pathString,
    director: cardConfig.pathString,
    country: cardConfig.pathString,
    year: cardConfig.pathString,
    duration: cardConfig.pathNumber,
    description: cardConfig.pathString,
    trailerLink: cardConfig.pathLink,
    image: cardConfig.pathLink,
    thumbnail: cardConfig.pathLink,
  }).messages(validatorMessage),
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

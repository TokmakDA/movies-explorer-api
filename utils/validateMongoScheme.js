const validator = require('validator');

const validateScheme = {
  validateURL(value) {
    if (!validator.isURL(value)) {
      throw new Error(
        'Поле {PATH} должно быть ссылкой. Введите правильную ссылку',
      );
    }
  },
  validateEmail(value) {
    if (!validator.isEmail(value)) {
      throw new Error('Введите правильный Email');
    }
  },
};

const messageSchemes = {
  minlength:
    'Поле "{PATH}" ({VALUE}) короче минимально допустимой длины ({MINLENGTH})',
  maxlength:
    'Поле "{PATH}" ({VALUE}) больше максимально допустимой длины  ({MAXLENGTH})',
  required: 'Поле {PATH} является обязательным',
};

module.exports = { messageSchemes, validateScheme };

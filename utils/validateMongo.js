const validator = require('validator');
const { mongoMessage } = require('../constants');

module.exports = {
  validateURL(value) {
    if (!validator.isURL(value)) {
      throw new Error(mongoMessage.validateURL);
    }
  },
  validateEmail(value) {
    if (!validator.isEmail(value)) {
      throw new Error(mongoMessage.validateEmail);
    }
  },
};

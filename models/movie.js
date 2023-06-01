const mongoose = require('mongoose');
const { messageSchemes, validateScheme } = require('../utils/validateMongoScheme');

const { Schema } = mongoose;

const movieSchema = new Schema(
  {
    country: {
      type: String,
      required: [true, messageSchemes.required],
      alias: 'страна создания фильма',
    },
    director: {
      type: String,
      required: [true, messageSchemes.required],
    },
    duration: {},
    year: {
      type: String,
      required: [true, messageSchemes.required],
    },
    description: {
      type: String,
      required: [true, messageSchemes.required],
    },
    image: {
      type: String,
      required: [true, messageSchemes.required],
      validate(value) {
        validateScheme.validateEmail(value);
      },
    },
    trailerLink: {
      type: String,
      required: [true, messageSchemes.required],
      validate(value) {
        validateScheme.validateURL(value);
      },
    },
    thumbnail: {
      type: String,
      required: [true, messageSchemes.required],
      validate(value) {
        validateScheme.validateURL(value);
      },
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: [true, messageSchemes.required],
    },
    movieId: {
      type: Number,
      required: [true, messageSchemes.required],
    },
    nameRU: {
      type: String,
      required: [true, messageSchemes.required],
    },
    nameEN: {
      type: String,
      required: [true, messageSchemes.required],
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('movie', movieSchema);

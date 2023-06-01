const mongoose = require('mongoose');
const {
  messageSchemes,
  validateScheme,
} = require('../utils/validateMongoScheme');

const { Schema } = mongoose;

const movieSchema = new Schema(
  {
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
    director: {
      type: String,
      required: [true, messageSchemes.required],
    },
    country: {
      type: String,
      required: [true, messageSchemes.required],
    },
    year: {
      type: String,
      required: [true, messageSchemes.required],
    },
    duration: {
      type: Number,
      required: [true, messageSchemes.required],
    },
    description: {
      type: String,
      required: [true, messageSchemes.required],
    },
    trailerLink: {
      type: String,
      required: [true, messageSchemes.required],
      validate(value) {
        validateScheme.validateURL(value);
      },
    },
    image: {
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

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('movie', movieSchema);

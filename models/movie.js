const mongoose = require('mongoose');
const validateMongo = require('../utils/validateMongo');
const { mongoMessage } = require('../constants');

const { Schema } = mongoose;

const movieSchema = new Schema(
  {
    movieId: {
      type: Number,
      required: [true, mongoMessage.required],
    },
    nameRU: {
      type: String,
      required: [true, mongoMessage.required],
    },
    nameEN: {
      type: String,
      required: [true, mongoMessage.required],
    },
    director: {
      type: String,
      required: [true, mongoMessage.required],
    },
    country: {
      type: String,
      required: [true, mongoMessage.required],
    },
    year: {
      type: String,
      required: [true, mongoMessage.required],
    },
    duration: {
      type: Number,
      required: [true, mongoMessage.required],
    },
    description: {
      type: String,
      required: [true, mongoMessage.required],
    },
    trailerLink: {
      type: String,
      required: [true, mongoMessage.required],
      validate(value) {
        validateMongo.validateURL(value);
      },
    },
    image: {
      type: String,
      required: [true, mongoMessage.required],
      validate(value) {
        validateMongo.validateURL(value);
      },
    },
    thumbnail: {
      type: String,
      required: [true, mongoMessage.required],
      validate(value) {
        validateMongo.validateURL(value);
      },
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: [true, mongoMessage.required],
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('movie', movieSchema);

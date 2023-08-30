const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Date
  },
  rating: {
    type: Number,
    min: 0,
    max: 10
  }
});

module.exports = mongoose.model('Movie', movieSchema);

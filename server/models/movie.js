const {Schema, model} = require('mongoose')

const movieSchema = new Schema({
  movie_name: {
      type: String,
      required: true,
      unique: true,
      },
  imdb_id: {
      type: String,
      required: true,
      unique: true,
      },
  reviews: [
    {
      type: Schema.Types.ObjecId,
      ref: 'Review'
    },
  ],
});

const Movie = model('Movie', movieSchema)

module.exports = Movie;
const {Schema, model} = require('mongoose')

const reviewSchema = new Schema({
  user_id: {
    type: String,
    required: true,
    unique: false,
  },
  movie_id: {
    type: String,
    required: true,
    unique: false,
  },
  review_score: {
    type: Number,
    required: true,
    unique: false,
  },
  review_text: {
    type: String,
    required: true,
    unique: false,
  }
})

const Review = model('Review', reviewSchema)   

module.exports = Review;
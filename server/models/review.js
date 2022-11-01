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
    type: String,
    required: true,
    unique: false,
  },
  review_text: {
    type: String,
    required: true,
    unique: false,
  },
  movie_name: {
    type: String,
    required:true,
    unique:false
  }
},{
  toJSON: {
    virtuals: true,
  }},
)

const Review = model('Review', reviewSchema)   

module.exports = Review;
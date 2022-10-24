const {Schema, model} = require('mongoose')

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: false,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review'
    },
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
  ],
},{
  toJSON: {
    virtuals: true,
  }},
);

const User = model('User', userSchema)

module.exports = User;
const {Schema, model} = require('mongoose')

const friendRequestSchema = new Schema({
  sender: {
    type: String,
    required: true,
    unique: false,
  },

  recipient: {
    type: String,
    required: true,
    unique: false,
  },
},{
  toJSON: {
    virtuals: true,
  }},
);

const FriendRequest = model('FriendRequest', friendRequestSchema)

module.exports = FriendRequest;
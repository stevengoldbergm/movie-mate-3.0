const {Schema, model} = require('mongoose')
const dateFormat = require("../utils/dateFormat")

const conversationSchema = new Schema({
  participants: [
    { username: {
      type:String,
      required: true,
      unique: false,
    }
  }
  ],
  messages: [
    {
      message_text: {
        type: String,
        required: true,
        unique: false,
        },
      time_sent: {
        type: Date,
        required: true,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
      sender: {
        type: String,
        required: true,
        unique: false,
      },
    },
  ],
},{
  toJSON: {
    virtuals: true,
  }},
);

const Conversation = model('Conversation', conversationSchema)

module.exports = Conversation;
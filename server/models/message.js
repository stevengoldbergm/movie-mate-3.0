const {Schema, model} = require('mongoose')

const messageSchema = new Schema({
  conversation_id: {
  type: String,
  required: true,
  unique: false,
  },
  message_text: {
    type: String,
    required: true,
    unique: false,
    },
  time_sent: {
    type: Date,
    required: true,
    default: Date.now
  },
},{
  toJSON: {
    virtuals: true,
  }},
);

const Message = model('Message', messageSchema)

module.exports = Message;
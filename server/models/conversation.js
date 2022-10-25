const {Schema, model} = require('mongoose')

const conversationSchema = new Schema({
  conversation_name: {
    type: String,
    require: true,
  },
  participants: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
  ],
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Message'
    },
  ],
},{
  toJSON: {
    virtuals: true,
  }},
);

const Conversation = model('Conversation', conversationSchema)

module.exports = Conversation;
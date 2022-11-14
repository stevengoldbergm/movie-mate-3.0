const {Schema, model} = require('mongoose')

const partyInviteSchema = new Schema({
  host: {
    type: String,
    required: true,
    unique: false,
  },

  recipients: [
    { username: {
      type:String,
      required: false,
      unique: false,
    }
  }
  ],

  date: {
    type: String,
    required: true,
    unique: false,
  },

  time: {
    type: String,
    required: true,
    unique: false,
  },
},{
  toJSON: {
    virtuals: true,
  }},
);

const PartyInvite = model('PartyInvite', partyInviteSchema)

module.exports = PartyInvite;
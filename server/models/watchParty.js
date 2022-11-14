const {Schema, model} = require('mongoose')

const watchPartySchema = new Schema({
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
    },
      attending: {
        Type: String,
      required: false,
      unique: false,
    },
},
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

const WatchParty = model('WatchParty', watchPartySchema)

module.exports = WatchParty;
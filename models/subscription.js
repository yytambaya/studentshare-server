const mongoose = require('mongoose')

const SubscriptionSchema = new mongoose.Schema({

  email:{
    type:String,
    required: true,
  },

  name: {
    type: String,
    required: false,
  },
  status: {
    type: Number,
    min: 0,
    max: 1,
    default: 1,
    required: false,
  }, 
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('NewsLetterSubscription', SubscriptionSchema)

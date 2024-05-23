const mongoose = require('mongoose')

const LitSchema = new mongoose.Schema({
  title:{
    type:String,
    required: true,
  },
  
  category:{
    type:String,
    required: false,
  },

  author: {
    type: String,
    required: true,
  },
  author_id: {
    type: String,
    required: false,
  },
  text: {
    type: String,
    required: false,
  },
  thumbnail: {
    type: String,
    required: false,
  },
  status: {
    type: Number,
    min: 0,
    max: 1,
    default: 0,
    required: false,
  }, 
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Lit', LitSchema)

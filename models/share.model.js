const mongoose = require('mongoose')

const shareSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  note: {
    type:String,
    required: false,
  },
  link: {
    type:String,
    required: false,
  },
  fileLink: {
    type:String,
    required: false,
  },
  status: {
    type: Number,
    min: 0,
    max: 1,
    default: 1,
    required: true,
  }, 
  }, {timestamps: true})

module.exports = mongoose.model('Share', shareSchema)

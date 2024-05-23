const mongoose = require('mongoose')

const parkSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: Number,
    min: 0,
    max: 1,
    default: 1,
    required: true,
  }, 
  }, {timestamps: true})

module.exports = mongoose.model('Park', parkSchema)

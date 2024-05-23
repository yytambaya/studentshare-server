const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({

  email:{
    type:String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    required: false,
  },
  dob: {
    type: String,
    required: false,
  },
  picture: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Admin', adminSchema)

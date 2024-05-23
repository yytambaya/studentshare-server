const mongoose = require('mongoose')

const reservationSchema = new mongoose.Schema({
  parkId:{
    type: String,
    required: true
  },
  slotId:{
    type: String,
    required: true,
  },
  userId:{
    type: String,
    required: true
  },
  status: {
    type: Number,
    min: 0,
    max: 1,
    default: 1,
    required: true
  }, 
  }, {timestamps: true})

module.exports = mongoose.model('Reservation', reservationSchema)

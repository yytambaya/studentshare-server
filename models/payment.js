const mongoose = require("mongoose");

const paymentSchema =  mongoose.Schema ({
    type: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly', 'none'],
        required: true
    },
    transaction_id: {
        type: String,
        required: true
    },
    ticket_id: {
        type: String,
        required: false
    },
    amount: {
        type: String,
        required: true
    },
    status: {
        type: Array,
    },
    winner:{
        type: String,
        required: false
    }, 
    user_id: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

});

module.exports = mongoose.model('Payment', paymentSchema);
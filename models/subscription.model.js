const mongoose = require("mongoose");

const subscriptionSchema =  mongoose.Schema ({
    type: {
        type: String,
        enum: ['once', 'monthly', 'yearly', 'none'],
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    start_date: {
        type: Date,
        default: Date.now,
        required: true
    },
    end_date: {
        type: Date,
        required: false,
    },
    
    createdAt: {
        type: Date,
        default: Date.now,
    },

});

subscriptionSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });
module.exports = mongoose.model('Subscription', subscriptionSchema);
const mongoose = require("mongoose");

const passwordResetSchema =  mongoose.Schema ({
    token: {
        type: String,
        unique: true,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600,// this is the expiry time in seconds
    },
    status: {
        type: Number,
        min: 0,
        max: 1,
        default: 0,
        required: true,
    },
    user_id: {
        type: String,
        unique: false,
        required: true,
    }
     
});

module.exports = mongoose.model('PasswordReset', passwordResetSchema);
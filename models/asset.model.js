const mongoose = require("mongoose");

const assetSchema =  mongoose.Schema ({
    name: {
        type: String,
        unique: true,
        required: true
    },
    signature: {
        type: String,
        unique: true,
        required: true
    },
    onwer: {
        type: String,
        required: true
    },
    status:{
        type: Number,
        min: 0,
        max: 1,
        default: 0,
        required: true,
    }
    
});

module.exports = mongoose.model('User', assetSchema);
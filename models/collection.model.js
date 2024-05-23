const mongoose = require("mongoose");

const collectionSchema =  mongoose.Schema ({
    name: {
        type: String,
        unique: true,
        required: true
    },
    parent_name: {
        type: String,
        default: "main"
    },
    user_id: {
        type: String,
        required: true
    }
    
});

module.exports = mongoose.model('Collection', collectionSchema);
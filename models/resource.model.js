const mongoose = require("mongoose");

const resourceSchema =  mongoose.Schema ({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String
    },
    link: {
        type: String,
        required: true,
    },
    col_id: {
        type: String,
        required: true
    }
    
});

module.exports = mongoose.model('Resource', resourceSchema);
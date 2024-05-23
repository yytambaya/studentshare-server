const mongoose = require("mongoose");

const leadboardSchema =  mongoose.Schema ({
    details: {
        type: Object,
        required: true
    },
});

module.exports = mongoose.model('Leadboard', leadboardSchema);
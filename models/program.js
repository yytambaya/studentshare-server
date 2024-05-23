const mongoose = require("mongoose");

const programSchema =  mongoose.Schema ({
    details: {
        type: Object,
        required: true
    },
});

module.exports = mongoose.model('Program', programSchema);
const mongoose = require("mongoose");

const jobSchema =  mongoose.Schema ({
    details: {
        type: Object,
        required: true
    },
});

module.exports = mongoose.model('Job', jobSchema);
const auth = require("./auth.middleware");
const dashbaord = require("./dashboard.middleware");
const validator = require('./validation.middleware');
const validatorV2 = require('./validation-v2.middleware')
//const Upload = require('./upload');
module.exports = {
    Auth: auth,
    Dashbaord: dashbaord,
    validator: validator,
    validatorV2: validatorV2,
    
};
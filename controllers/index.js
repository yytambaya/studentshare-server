const login = require("./login.controller");
//const dashboard = require("./dashboard.controller");
const dashboard = require("./dashboard")
const lit = require("./lit");
module.exports = {
    login: login,
    dashboard: dashboard,
    lit: lit,
}
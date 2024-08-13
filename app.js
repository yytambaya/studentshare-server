//imports
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const axios = require("axios");
const dayjs = require('dayjs');
const passport = require('passport')
const validator = require('validator');
const allConfig = require('./config/all.config');
require('./config/passport-setup')



//variables
const app = express();
require("./routers").allrouters((app));
//const router = express.Router().route('/');

//init/configs
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize())
app.use(passport.session())
//console.log(process.env.DB_URL);


//DB connection
const DB_URL = allConfig.App.ENV == "PROD"? allConfig.App.PROD_DB_URL : allConfig.App.DEV_DB_URL;
const ENV = allConfig.App.ENV == "PROD"? "PRODUCTION" : "DEVELOPMENT";

mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(  () => {
    console.log("DB connected");
})
.catch( (err) => {
    console.log("Can't connect to DB:" + err);
})



//Routes
app.get("/", (req, res) => {
    res.send("Student-share API");
    console.log("Student-share API");
    
});


//Server
app.listen(process.env.PORT || 8000, ()=>{
    console.log("Cryptolits Server started...");
    console.log("Environment : " + ENV);           
    //const e_valid = validator.isEmail("g@d.com");
    //console.log("Email: " + e_valid);
    
})
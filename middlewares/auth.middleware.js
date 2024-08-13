const config = require('../config');
const User = require("../models/user.model");
const Admin = require("../models/admin");
const Subscription = require("../models/subscription.model");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const accountExists = ((req, res, next) => {
    User.findOne({email: req.body.email}, (err, result) => {
        if(err){
            console.log("Error: ", err);
            res.json({error:"error", result:"something went wrong"});
        }else if(result){
            res.json({error:"error", result:"email already registered"});
        }else{
            next();
        }
    });
})

const regNoExists = ((req, res, next) => {
    User.findOne({regNo: req.body.regNo}, (err, result) => {
        if(err){
            console.log("Error: ", err);
            res.json({error:"error", result:"something went wrong"});
        }else if(result){
            res.json({error:"error", result:"registration number already registered"});
        }else{
            next();
        }
    });
})

const subscriptionExists = ((req, res, next) => {
    User.findOne({email: req.body.email}, (err, result) => {
        if(err){
            console.log("Error: ", err);
            res.json({error:"error", result:"something went wrong"});
        }else if(result){
            res.json({error:"error", result:"email already registered"});
        }else{
            next();
        }
    });
})

const adminAccountExists = ((req, res, next) => {
    Admin.findOne({email: req.body.email}, (err, result) => {
        if(err){
            console.log("Error: ", err);
            res.json({error:"error", result:"something went wrong"});
        }else if(result){
            res.json({error:"error", status: 409, result:"email already registered"});
        }else{
            next();
        }
    });
})

const googleAccountExists = async (id) => {
    var returnValue = {};
    await User.findOne({googleId: id}, (err, result) => {
        if(err){
            console.log("Error: ", err);
            returnValue = {error:"error", result:"something went wrong"};
        }else if(result){
            returnValue = {error:"", result:"ACCOUNT_EXISTS"};
        }else{
            returnValue = {error:"", result:"NO_ACCOUNT"};
        }
    });
    return returnValue;
}

const verifyToken = ((req, res, next) => {
    const secret = "56278t7hbdjksji";
    jwt.verify(req.query.token, config.allconfig.temp_var.token_secret, (err, decoded) => {
        if(err){
            return res.json({error: "error", result:"Unuthorized request. Login"});
        }
        config.allconfig.temp_var.id = decoded.id;
        console.log(decoded.id); 
        next();
    });
})



const verifyAccount = ((req, res, next) => {
    User.findOne({email: req.body.email}, (err, result) => {
        if(err){
            console.log("Error: ", err);
            res.json({error:"error", result:"something went wrong"});
        }else if(result){
            res.json({error:"error", result:"email already registered"});
        }else{
            next();
        }
    });
})


const isAuthorized = ((req, res, next) => {
    let api_key = req.headers["x-access-key"];
            
    if (!api_key) {
        return res.json({error: "error", result:"unauthorized"});
    }
    //jwt.verify(token, config.allconfig.temp_var.token_secret, (err, decoded) => {
        if(api_key == process.env.API_KEY){
            next();
        }else{
            return res.json({error: "error", result:"unauthorized"});
        }
        /*if (err) {
            return res.json({error: "error", result:"unuthorized"});
        }*/
        //req.userId = decoded.id;

        //});    
});



const isLogged = ((req, res, next) => {
    let token = req.headers["x-access-token"];
      
    if (!token) {
        return res.json({error: "error", result:"unauthorized. Login"});
    }
    jwt.verify(token, config.allconfig.temp_var.token_secret, (err, decoded) => {
        if (err) {
            //console.log("Token: " + token)
            return res.json({error: "error", result:"unauthorized. Login"});
        }
        //req.userId = decoded.id;
          next();
        });    
});


const isPaid = ((req, res, next) => {
    //var id = req.body.id != undefined? req.body.id: req.query.id;
    var id = req.body.id != undefined? req.body.id: req.query.id;
    //console.log("isPaid ID: " + id);
    Subscription.findOne({user_id: id}, (err, result) => {
        if(err){
            console.log("Error: ", err);
            res.json({error:"error", result:"something went wrong"});
        }else if(result){
            next();
        }else{
            res.json({error:"error", result:"This user has not paid"});
        }
    });
})


//Google auth
const ensureAuth = ((req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    } else {
      res.redirect('/')
    }
})
// if user is authenticated and going to login page then redirected to home page if not authenticated redirected to login page  .
const ensureGuest = ((req, res, next) => {
    if (!req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/log');
    }
})


module.exports = {
    isAuthorized: isAuthorized,
    isLogged: isLogged,
    verifyToken: verifyToken,
    accountExists: accountExists,
    regNoExists: regNoExists,
    subscriptionExists: subscriptionExists,
    adminAccountExists: adminAccountExists,
    googleAccountExists: googleAccountExists,
    isPaid: isPaid,
    ensureAuth: ensureAuth,
    ensureGuest: ensureGuest,
}
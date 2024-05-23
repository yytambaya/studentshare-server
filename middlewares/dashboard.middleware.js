const config = require('../config');
const Program = require("../models/program");
const Leadboard = require("../models/leadboard");
const Payment = require("../models/payment");
const Lit = require("../models/lit");
const User = require("../models/user.model");
const Park = require("../models/park.model");
const Slot = require("../models/slot.model");
const Reservation = require("../models/reservation.model");

const programExists = ((req, res, next) => {
    Program.findOne({ "details.name": req.body.name}, (err, result) => {
        if(err){
            console.log("Error: ", err);
            res.json({error:"error", result:"something went wrong"});
        }else if(result){
            res.json({error:"error", result:"program already exists"});
        }else{
            next();
        }
    });
})


const leadExists = ((req, res, next) => {
    Leadboard.findOne({program_id: req.body.id}, (err, result) => {
        if(err){
            console.log("Error: ", err);
            res.json({error:"error", result:"something went wrong"});
        }else if(result){
            res.json({error:"error", result:"Lead already exists"});
        }else{
            next();
        }
    });
})

const paymentExists = ((req, res, next) => {
    Payment.findOne({transaction_id: req.body.id}, (err, result) => {
        if(err){
            console.log("Error: ", err);
            res.json({error:"error", result:"something went wrong"});
        }else if(result){
            res.json({error:"error", result:"Lead already exists"});
        }else{
            next();
        }
    });
})

const litExists = ((req, res, next) => {
    Lit.findOne({title: req.body.title}, (err, result) => {
        if(err){
            console.log("Error: ", err);
            res.json({error:"error", result:"something went wrong"});
        }else if(result){
            res.json({error:"error", status: 409, result:"Lit already exists"});
        }else{
            next();
        }
    });
})

const emailExists = ((req, res, next) => {
    User.findOne({email: req.body.email}, (err, result) => {
        if(err){
            console.log("Error: ", err);
            res.json({error:"error", result:"something went wrong"});
        }else if(result){
            res.json({error:"error", status: 409, result:"email already exists"});
        }else{
            next();
        }
    });
})

const phoneNumberExists = ((req, res, next) => {
    User.findOne({phoneNumber: req.body.phoneNumber}, (err, result) => {
        if(err){
            console.log("Error: ", err);
            res.json({error:"error", result:"something went wrong"});
        }else if(result){
            res.json({error:"error", status: 409, result:"phone number already exists"});
        }else{
            next();
        }
    });
})


const parkNameExists = ((req, res, next) => {
    Park.findOne({name: req.body.name}, (err, result) => {
        if(err){
            console.log("Error: ", err);
            res.json({error:"error", result:"something went wrong"});
        }else if(result){
            res.json({error:"error", status: 409, result:"park already exists"});
        }else{
            next();
        }
    });
})

const parkSlotExists = ((req, res, next) => {
    Slot.findOne({name: req.body.name, parkId: req.body.parkId}, (err, result) => {
        if(err){
            console.log("Error: ", err);
            res.json({error:"error", result:"something went wrong"});
        }else if(result){
            res.json({error:"error", status: 409, result:"slot already exists in this park"});
        }else{
            next();
        }
    });
})



const emailEditExists = ((req, res, next) => {
    User.findOne({email: req.body.email}, (err, result) => {
        if(err){
            console.log("Error: ", err);
            res.json({error:"error", result:"something went wrong"});
        }else if(result){
            User.findOne({email: req.body.email, _id: req.body.id}, (err2, result2) => {
                if(err2){
                    console.log("Error: ", err2)
                    res.json({error:"error", result:"something went wrong"})
                }
                
                if(result2?.email == req.body.email){
                    next()
                } else{    
                    res.json({error:"error", status: 409, result:"email already exists"});
                }
            })
            
        }else{
            next();
        }
    });
})

const phoneNumberEditExists = ((req, res, next) => {
    User.findOne({phoneNumber: req.body.phoneNumber}, (err, result) => {
        if(err){
            console.log("Error: ", err);
            res.json({error:"error", result:"something went wrong"});
        }else if(result){
            User.findOne({phoneNumber: req.body.phoneNumber, _id: req.body.id}, (err2, result2) => {
                if(err2){
                    console.log("Error: ", err2)
                    res.json({error:"error", result:"something went wrong"})
                }
                
                if(result2?.phoneNumber == req.body.phoneNumber){
                    next()
                } else{    
                    res.json({error:"error", status: 409, result:"phone number already exists"});
                }
            })
        }else{
            next();
        }
    });
})


const parkNameEditExists = ((req, res, next) => {
    Park.findOne({name: req.body.name}, (err, result) => {
        if(err){
            console.log("Error: ", err);
            res.json({error:"error", result:"something went wrong"});
        }else if(result){
            Park.findOne({name: req.body.name, _id: req.body.id}, (err2, result2) => {
                if(err2){
                    console.log("Error: ", err2)
                    res.json({error:"error", result:"something went wrong"})
                }
                
                if(result2?.name == req.body.name){
                    next()
                } else{    
                    res.json({error:"error", status: 409, result:"park already exists"});
                }
            })
        }else{
            next();
        }
    });
})

const parkSlotEditExists = ((req, res, next) => {
    Slot.findOne({name: req.body.name, parkId: req.body.parkId}, (err, result) => {
        if(err){
            console.log("Error: ", err);
            res.json({error:"error", result:"something went wrong"});
        }else if(result){
            Slot.findOne({name: req.body.name, parkId: req.body.parkId, _id: req.body.id}, (err2, result2) => {
                if(err2){
                    console.log("Error: ", err2)
                    res.json({error:"error", result:"something went wrong"})
                }
                
                if(result2?.name == req.body.name || result2?.parkId == req.body?.parkId){
                    next()
                } else{    
                    res.json({error:"error", status: 409, result:"slot already exists"});
                }
            })
        }else{
            next();
        }
    });
})



module.exports = {
    programExists: programExists,
    leadExists: leadExists,
    paymentExists: paymentExists,
    litExists: litExists,
    emailExists,
    phoneNumberExists,
    parkNameExists,
    parkSlotExists,
    emailEditExists,
    phoneNumberEditExists,
    parkNameEditExists,
    parkSlotEditExists
}
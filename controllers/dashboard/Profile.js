const User = require('../../models/user.model');
const Admin = require('../../models/admin');


exports.getUser = (req, res) => {
    
    User.findOne({_id: req.query.id}, (err, result) => {
        if(err){
            console.log("Error: ", err);
            return res.json({error:"error", result:"something went wrong"});
        }
        if(result){
            return res.json({error:"", result: [result]});
        }else{
            return res.json({error:"error", result:"User not found"});
        }
    });   

}

exports.getAdmin = (req, res) => {
    
    Admin.findOne({_id: req.query.id}, (err, result) => {
        if(err){
            console.log("Error: ", err);
            return res.json({error:"error", result:"something went wrong"});
        }
        if(result){
            return res.json({error:"", result: result});
        }else{
            return res.json({error:"error", result:"User not found"});
        }
    });   

}

exports.getAllUsers = (req, res) => {
        
    User.find({}, (err, result) => {
        if(err){
            console.log("Error: ", err);
            return res.json({error:"error", result:"something went wrong"});
        }
        if(result){
            return res.json({error:"", result: result});
        }else{
            return res.json({error:"error", result:"You have no users. Create one"});
        }
    });   

}

exports.editUser = (req, res) => {
    const details = {
        name: req.body.name,
    }
   User.findByIdAndUpdate({_id: req.body.user_id}, details, (err, result) => {
        if(err){
            return res.json({error:"error", result:"something went wrong"});
        }
        if(result){
            console.log(result);
            return res.json({error:"", result:result});
        }else{
            return res.json({error:"", result:"Profile not found"});
        }
   });

}

exports.removeProfile = (req, res) => {
    User.findByIdAndDelete(req.body.user_id, (err, result) => {
         if(err){
             return res.json({error:"error", result:"something went wrong"});
         }
         if(result){
             //console.log(result);
             return res.json({error:"", result:"Profile removed successfully"});
         }else{
            return res.json({error:"error", result:"Profile not found"});
         }
    });
 
 }
 




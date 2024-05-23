const User = require('../models/user.model');
const bcrypt = require("bcrypt");

exports.setUser = (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: bcrypt.hashSync(req.body.password, 8),
        status: req.body.status
    })
    
    user.save()
    .then( result => {
        //console.log("USER ID: " + result._id);
        return res.json({error: "", result: "A new user created successfully", })
    })
    .catch(err => {
        console.log("Error: ", err);
        res.json({error: "erorr", result: err, })
    })

}


exports.getUser = (req, res) => {
    
    User.findOne({_id: req.query.id}, (err, result) => {
        if(err){
            console.log("Error: ", err);
            return res.json({error:"error", result:"something went wrong"});
        }
        if(result){
            return res.json({error:"", result: result});
        }else{
            return res.json({error:"error", result:"user not found"});
        }
    });   

}



exports.getAllUsers = async (req, res) => {
    console.log("Getting more")   
    var returnValue = {}
    try{
       await User.find({}).skip(parseInt(req.query.skip)).limit(parseInt(req.query.limit)).sort({createdAt: -1}).then(async result => {
           if(Object.keys(result).length != 0){
                returnValue = {error:"", result:result}
           
           }else{
               returnValue = {error:"error", result:"NO_LITS"};
           }

       }).catch(error => {
           //console.log("Error: " + error)
           returnValue = {error: "error", result:"Something went wrong"}
       })   
       //console.log("Tweets with profiles...")
       return res.json(returnValue);

   }catch(error){
       //console.log(error)
       return res.json({error:"error", result:"Something went wrong"});
       
   }

}


exports.editUser = (req, res) => {
    const details = {
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        status: req.body.status
    }

   User.findByIdAndUpdate({_id: req.body.id}, details, (err, result) => {
        if(err){
            return res.json({error:"error", result:"something went wrong"});
        }
        if(result){

            console.log("Data updated")
            console.log(result);
            return res.json({error:"", result:result});
        }else{
            return res.json({error:"error", result:"User not found"});
        }
   })

}

exports.removeUser = (req, res) => {
    User.findByIdAndDelete(req.body.id, (err, result) => {
         if(err){
             return res.json({error:"error", result:"something went wrong"});
         }
         if(result){
             //console.log(result);
             return res.json({error:"", result:"User removed successfully"});
         }else{
            return res.json({error:"error", result:"User not found"});
         }
    });
 
 }
 




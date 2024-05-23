const config = require("../config");
const User = require('../models/user.model');
const Collection = require('../models/collection.model');
const Resource = require('../models/resource.model');
const General = require('./general.controller');
const Job = require('../models/Job');
const { rawListeners } = require("../models/user.model");

exports.getHomepage = (req, res) => {
    return res.json("Welcome to your dashboard");
}


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


exports.setJob = (req, res) => {
    
    const jobDetails = {
        title: req.body.title,
        type: req.body.type,
        desc: req.body.desc,
        location: req.body.location,
        applyLink: req.body.applyLink,
        companyName: req.body.companyName,
        companyLink: req.body.companyLink,
        featured: req.body.featured,
        user_id: req.body.user_id,
    }
    
    const job = new Job(jobDetails)
    job.save()
    .then( result => {
        //console.log("USER ID: " + result._id);
        return res.json({error: "", result: "job post created successfully", })
    })
    .catch(err => {
        console.log("Error: ", err);
        res.json({error: "erorr", result: err, })
    })

}

exports.getAllUserJobs = (req, res) => {
        
    Job.find({user_id: req.query.id}, (err, result) => {
        if(err){
            console.log("Error: ", err);
            return res.json({error:"error", result:"something went wrong"});
        }
        if(result){
            return res.json({error:"", result: result});
        }else{
            return res.json({error:"error", result:"You have no jobs. Create one"});
        }
    });   

}

exports.getAllJobs = (req, res) => {
    //filter    
    Job.find({user_id: req.query.id}, (err, result) => {
        if(err){
            console.log("Error: ", err);
            return res.json({error:"error", result:"something went wrong"});
        }
        if(result){
            return res.json({error:"", result: result});
        }else{
            return res.json({error:"error", result:"You have no jobs. Create one"});
        }
    });   

}

exports.getSingleJob = (req, res) => {
        
    Job.findOne({_id: req.query.job_id}, (err, result) => {
        if(err){
            console.log("Error: ", err);
            return res.json({error:"error", result:"something went wrong"});
        }
        if(result){
            return res.json({error:"", result: result});
        }else{
            return res.json({error:"error", result:"Job not found"});
        }
    });   

}

exports.editJob = (req, res) => {
    const jobDetails = {
        title: req.body.title,
        type: req.body.type,
        desc: req.body.desc,
        location: req.body.location,
        applyLink: req.body.applyLink,
        companyName: req.body.companyName,
        companyLink: req.body.companyLink,
        featured: req.body.featured,
        user_id: req.body.user_id,
    }
    Job.findByIdAndUpdate({_id: req.body.job_id}, {jobDetails}, (err, result) => {
         if(err){
             return res.json({error:"error", result:"something went wrong"});
         }
         if(result){
             //console.log(result);
             return res.json({error:"", result:"Job updated successfully"});
         }else{
             return res.json({error:"", result:"Job not found"});
         }
    });
 
 }

 exports.removeJob = (req, res) => {
    Job.findByIdAndDelete(req.query.job_id, (err, result) => {
         if(err){
             return res.json({error:"error", result:"something went wrong"});
         }
         if(result){
             //console.log(result);
             return res.json({error:"", result:"Job removed successfully"});
         }else{
            return res.json({error:"error", result:"Job not found"});
         }
    });
 
 }

exports.setCollection = (req, res) => {
        
    const collection = new Collection({
        name: req.body.name,
        parent_name: req.body.parent_name,
        user_id: req.body.id
    })
    collection.save()
    .then( result => {
        //console.log("USER ID: " + result._id);
        return res.json({error: "", result: "Collection created successfully", })
    })
    .catch(err => {
        console.log("Error: ", err);
        res.json({error: "erorr", result: err, })
    })

}

exports.getAllCollections = (req, res) => {
        
    Collection.find({user_id: req.query.id}, (err, result) => {
        if(err){
            console.log("Error: ", err);
            return res.json({error:"error", result:"something went wrong"});
        }
        if(result){
            return res.json({error:"", result: result});
        }else{
            return res.json({error:"error", result:"You have no collections. Create one"});
        }
    });   

}


exports.getCollection = (req, res) => {
        
    Collection.findOne({_id: req.query.col_id}, (err, result) => {
        if(err){
            console.log("Error: ", err);
            return res.json({error:"error", result:"something went wrong"});
        }
        if(result){
            return res.json({error:"", result: result});
        }else{
            return res.json({error:"error", result:"Collection not found"});
        }
    });   

}


exports.editCollection = (req, res) => {
   Collection.findByIdAndUpdate({_id: req.body.col_id}, {name: req.body.name, parent_id: "main"}, (err, result) => {
        if(err){
            return res.json({error:"error", result:"something went wrong"});
        }
        if(result){
            //console.log(result);
            return res.json({error:"", result:"Collection updated successfully"});
        }else{
            return res.json({error:"", result:"Collection not found"});
        }
   });

}

exports.removeCollection = (req, res) => {
    Collection.findByIdAndDelete(req.query.col_id, (err, result) => {
         if(err){
             return res.json({error:"error", result:"something went wrong"});
         }
         if(result){
             //console.log(result);
             return res.json({error:"", result:"Collection removed successfully"});
         }else{
            return res.json({error:"error", result:"Collection not found"});
         }
    });
 
 }
 


 exports.setResource = (req, res) => {
        
    const resource = new Resource({
        name: req.body.name,
        desc: req.body.desc,
        link: req.body.link,
        col_id: req.body.col_id
    })
    resource.save()
    .then( result => {
        //console.log("USER ID: " + result._id);
        return res.json({error: "", result: "Resource created successfully", })
    })
    .catch(err => {
        console.log("Error: ", err);
        res.json({error: "erorr", result: "Something happened", })
    })

}

exports.getAllCollectionResources = (req, res) => {
        
    Resource.find({col_id: req.query.col_id}, (err, result) => {
        if(err){
            console.log("Error: ", err);
            return res.json({error:"error", result:"something went wrong"});
        }
        if(result){
            return res.json({error:"", result: result});
        }else{
            return res.json({error:"error", result:"You have no resources. Create one"});
        }
    });   

}


exports.getResource = (req, res) => {
        
    Resource.findOne({_id: req.query.res_id}, (err, result) => {
        if(err){
            console.log("Error: ", err);
            return res.json({error:"error", result:"something went wrong"});
        }
        if(result){
            return res.json({error:"", result: result});
        }else{
            return res.json({error:"error", result:"Resource not found"});
        }
    });   

}


exports.editResource = (req, res) => {
   Resource.findByIdAndUpdate({_id: req.body.res_id}, {name: req.body.name, desc: req.body.desc, link: req.body.link, col_id: req.body.col_id}, (err, result) => {
        if(err){
            return res.json({error:"error", result:"something went wrong"});
        }
        if(result){
            console.log(result);
            return res.json({error:"", result:"Resource updated successfully"});
        }else{
            return res.json({error:"", result:"Resource not found"});
        }
   });

}

exports.removeResource = (req, res) => {
    Resource.findByIdAndDelete(req.query.res_id, (err, result) => {
         if(err){
             return res.json({error:"error", result:"something went wrong"});
         }
         if(result){
             console.log(result);
             return res.json({error:"", result:"Resource removed successfully"});
         }else{
            return res.json({error:"error", result:"Resource not found"});
         }
    });
 
 }

 exports.setFeedback = (req, res) => {
    var to = config.allconfig.secrets.MAIL_USERNAME;
    try{
        General.sendMail2(req.body.email, to, req.body.name, req.body.desc);
        res.json({error:"", result: "feedback sent"});
    }catch(error){
        res.json({error: "error", result: "Something went wrong"});
    }   
}
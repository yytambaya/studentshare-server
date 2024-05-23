const Program = require('../../models/program');
var fs = require('fs');
var path = require('path');
var dayjs = require('dayjs');
const { query } = require('express');

exports.setProgram = (req, res) => {
    const logo_url =  req.logo?  Object.keys(req.logo).length != 0? {
        data: fs.readFileSync(path.join(__dirname + '../uploads/logos/' + req.logo.filename)),
        contentType: 'image/png'
    }: {}: {};
    const details = {
        name: req.body.name,
        logo: logo_url,
        desc: req.body.desc,
        category: req.body.category,
        amount_to_raise: req.body.amount_to_raise,
        min_amount: req.body.min_amount,
        max_amount: req.body.max_amount,
        period: req.body.period,
        winner_percentage: req.body.winner_percentage,
        participants: req.body.participants,
        status: req.body.status,
        assign_to: req.body.assign_to,
        admin_id: req.body.id,
       createdAt: Date.now
    }
    
    const program = new Program({
       details: details
    })
    program.save()
    .then( result => {
        //console.log("USER ID: " + result._id);
        return res.json({error: "", result: "A new program created successfully", })
    })
    .catch(err => {
        console.log("Error: ", err);
        res.json({error: "erorr", result: err, })
    })

}

exports.getAllPrograms = (req, res) => {
        
    Program.find({}, (err, result) => {
        if(err){
            console.log("Error: ", err);
            return res.json({error:"error", result:"something went wrong"});
        }
        if(result){
            return res.json({error:"", result: result});
        }else{
            return res.json({error:"error", result:"You have no programs. Create one"});
        }
    });   

}

exports.getAllProgramsByType = async (req, res) => {
        //"details.assign_to.1": {$gte:  dayjs().startOf("week"), $lte: dayjs().endOf("week")}
        //console.log("Month: " + dayjs().startOf("month").format('YYYY-MM-DD') +  " End: " + dayjs().endOf("month").format('YYYY-MM-DD'))   
        console.log("Talking to db")
        const type = req.query.type == "daily" ? "day" : req.query.type == "weekly" ? "week" : req.query.type == "monthly" ? "month" : "none"; 
        const status = req.query.status 
        //== "{$where: 'details.status == daily || details.status == weekly details.status == monthly'}" ? "" : req.query.status;
        //const assignType = type == "none" ? "" : type;
        var query = {};
        if(req.query.type == "daily" || req.query.type == "weekly" ||req.query.type == "monthly"){
            if(req.query.status == "all"){ 
                query =  {"details.assign_to.0" : req.query.type, "details.assign_to.1": {$gte:  dayjs().startOf(type).format('YYYY-MM-DD'), $lte: dayjs().endOf(type).format('YYYY-MM-DD')}}
            
            }else{
                query =  {"details.status": status, "details.assign_to.0" : req.query.type, "details.assign_to.1": {$gte:  dayjs().startOf(type).format('YYYY-MM-DD'), $lte: dayjs().endOf(type).format('YYYY-MM-DD')}}
            
            }    
        }else if(req.query.type == "all"){
            if(req.query.status == "all"){
                query =  {} 
            }else{
                query =  {"details.status": status}
            }
            
        }else if(req.query.type == "assigned"){
            if(req.query.status == "all"){
                query =  {"details.assign_to" : {$exists: true}}
            }else{
                query =  {"details.status": status, "details.assign_to": {$exists: true}}
                
            }
        }
        else if(req.query.type == "notAssigned"){
            if(req.query.status == "all"){
                query =  {"details.assign_to.0" : ""}
            }else{
                query =  {"details.status": status, "details.assign_to.0" : ""}
            }
            
        }else{
            if(req.query.status == "all"){
                query =  {}
            }else{
                query =  {"details.status": status}
            }
            
        }
        
        
            console.log("Non empty query")
            Program.find(query, (err, result) => {
                if(err){
                    console.log("Error: ", err);
                    return res.json({error:"error", result:"something went wrong"});
                }
                if(result){
                    return res.json({error:"", result: result});
                }else{
                    return res.json({error:"error", result:"You have no programs. Create one"});
                }
            });   

}

exports.getProgram = (req, res) => {
        
    Program.findOne({_id: req.query.id}, (err, result) => {
        if(err){
            console.log("Error: ", err);
            return res.json({error:"error", result:"something went wrong"});
        }
        if(result){
            return res.json({error:"", result: result});
        }else{
            return res.json({error:"error", result:"Program not found"});
        }
    });   

}


exports.editProgram = (req, res) => {
    /*const details = {
        name: req.body.name,
        desc: req.body.desc,
        category: req.body.category,
        amount_to_raise: req.body.amount_to_raise,
        min_amount: req.body.min_amount,
        max_amount: req.body.max_amount,
        period: req.body.period,
        winner_percentage: req.body.winner_percentage,
        participants: req.body.participants,
        admin_id: req.body.id,
       createdAt: Date.now
    }*/

    const logo_url =  req.logo?  Object.keys(req.logo).length != 0? {
        data: fs.readFileSync(path.join(__dirname + '../uploads/logos/' + req.logo.filename)),
        contentType: 'image/png'
    }: {}: {};
    const details = {
        name: req.body.name,
        logo: logo_url,
        desc: req.body.desc,
        category: req.body.category,
        amount_to_raise: req.body.amount_to_raise,
        min_amount: req.body.min_amount,
        max_amount: req.body.max_amount,
        period: req.body.period,
        winner_percentage: req.body.winner_percentage,
        participants: req.body.participants,
        status: req.body.status,
        assign_to: req.body.assign_to,
        admin_id: req.body.id,
       createdAt: Date.now
    }
    
   Program.findByIdAndUpdate({_id: req.body.program_id}, details, (err, result) => {
        console.log(req.body)
        if(err){
            return res.json({error:"error", result:"something went wrong"});
        }
        if(result){
            console.log(result);
            return res.json({error:"", result:"Program updated successfully"});
        }else{
            return res.json({error:"", result:"Program not found"});
        }
   });

}

exports.removeProgram = (req, res) => {
    Program.findByIdAndDelete(req.body.id, (err, result) => {
         if(err){
             return res.json({error:"error", result:"something went wrong"});
         }
         if(result){
             //console.log(result);
             return res.json({error:"", result:"Program removed successfully"});
         }else{
            return res.json({error:"error", result:"Program not found"});
         }
    });
 
 }
 
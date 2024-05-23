const Leadboard = require('../../models/leadboard');

exports.setLead = (req, res) => {
    const details = {
        program_id: req.body.prog_id,
        user_id: req.body.user_id,
        win_amount: req.body.win_amount,
        win_method: req.body.win_method,
        status: req.body.status,
        createdAt: Date.now
    }
    
    const lead = new Leadboard({
       details: details
    })
    lead.save()
    .then( result => {
        //console.log("USER ID: " + result._id);
        return res.json({error: "", result: "A new lead created successfully", })
    })
    .catch(err => {
        console.log("Error: ", err);
        res.json({error: "erorr", result: err, })
    })

}

exports.getAllLeads = (req, res) => {
        
    Leadboard.find({}, (err, result) => {
        if(err){
            console.log("Error: ", err);
            return res.json({error:"error", result:"something went wrong"});
        }
        if(result){
            return res.json({error:"", result: result});
        }else{
            return res.json({error:"error", result:"You have no leads. Create one"});
        }
    });   

}


exports.getLead = (req, res) => {
        
    Lead.findOne({_id: req.query.id}, (err, result) => {
        if(err){
            console.log("Error: ", err);
            return res.json({error:"error", result:"something went wrong"});
        }
        if(result){
            return res.json({error:"", result: result});
        }else{
            return res.json({error:"error", result:"Lead not found"});
        }
    });   

}


exports.editLead = (req, res) => {
    const details = {
        prog_id: req.body.prog_id,
        user_id: req.body.user_id,
        win_amount: req.body.win_amount,
        win_method: req.body.win_method,
        createdAt: Date.now
    }
   Leadboard.findByIdAndUpdate({_id: req.body.id}, details, (err, result) => {
        if(err){
            return res.json({error:"error", result:"something went wrong"});
        }
        if(result){
            //console.log(result);
            return res.json({error:"", result:"Leadboard updated successfully"});
        }else{
            return res.json({error:"", result:"Leadboard not found"});
        }
   });

}

exports.removeLead = (req, res) => {
    Leadboard.findByIdAndDelete(req.query.id, (err, result) => {
         if(err){
             return res.json({error:"error", result:"something went wrong"});
         }
         if(result){
             //console.log(result);
             return res.json({error:"", result:"Leadboard removed successfully"});
         }else{
            return res.json({error:"error", result:"Leadboard not found"});
         }
    });
 
 }
 
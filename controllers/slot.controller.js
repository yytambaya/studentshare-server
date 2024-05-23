const Slot = require('../models/slot.model');


exports.setSlot = (req, res) => {
    const slot = new Slot({
        name: req.body.name,
        parkId: req.body.parkId,
        status: req.body.status
    })
    
    slot.save()
    .then( result => {
        //console.log("USER ID: " + result._id);
        return res.json({error: "", result: "A new slot created successfully", })
    })
    .catch(err => {
        console.log("Error: ", err);
        res.json({error: "erorr", result: err, })
    })

}


exports.getSlot = (req, res) => {
    
    Slot.findOne({_id: req.query.id}, (err, result) => {
        if(err){
            console.log("Error: ", err);
            return res.json({error:"error", result:"something went wrong"});
        }
        if(result){
            return res.json({error:"", result: result});
        }else{
            return res.json({error:"error", result:"slot not found"});
        }
    });   

}



exports.getAllSlots = async (req, res) => {
    console.log("Getting more")   
    var returnValue = {}
    try{
       await Slot.find({}).skip(parseInt(req.query.skip)).limit(parseInt(req.query.limit)).sort({createdAt: -1}).then(async result => {
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


exports.editSlot = (req, res) => {
    const details = {
        name: req.body.name,
        parkId: req.body.parkId,
        status: req.body.status
    }

   Slot.findByIdAndUpdate({_id: req.body.id}, details, (err, result) => {
        if(err){
            return res.json({error:"error", result:"something went wrong"});
        }
        if(result){
            console.log(result);
            return res.json({error:"", result:result});
        }else{
            return res.json({error:"", result:"Slot not found"});
        }
   });

}

exports.removeSlot = (req, res) => {
    Slot.findByIdAndDelete(req.body.id, (err, result) => {
         if(err){
             return res.json({error:"error", result:"something went wrong"});
         }
         if(result){
             //console.log(result);
             return res.json({error:"", result:"Slot removed successfully"});
         }else{
            return res.json({error:"error", result:"Slot not found"});
         }
    });
 
 }
 




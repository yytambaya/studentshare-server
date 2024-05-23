const Park = require('../models/park.model');


exports.setPark = (req, res) => {
    const park = new Park({
        name: req.body.name
    })
    
    park.save()
    .then( result => {
        //console.log("USER ID: " + result._id);
        return res.json({error: "", result: "A new park created successfully", })
    })
    .catch(err => {
        console.log("Error: ", err);
        res.json({error: "erorr", result: err, })
    })

}


exports.getPark = (req, res) => {
    
    Park.findOne({_id: req.query.id}, (err, result) => {
        if(err){
            console.log("Error: ", err);
            return res.json({error:"error", result:"something went wrong"});
        }
        if(result){
            return res.json({error:"", result: result});
        }else{
            return res.json({error:"error", result:"park not found"});
        }
    });   

}



exports.getAllParks = async (req, res) => {
    console.log("Getting more")   
    var returnValue = {}
    try{
       await Park.find({}).skip(parseInt(req.query.skip)).limit(parseInt(req.query.limit)).sort({createdAt: -1}).then(async result => {
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


exports.editPark = (req, res) => {
    const details = {
        name: req.body.name,
        status: req.body.status
    }

   Park.findByIdAndUpdate({_id: req.body.id}, details, (err, result) => {
        if(err){
            return res.json({error:"error", result:"something went wrong"});
        }
        if(result){
            console.log(result);
            return res.json({error:"", result:result});
        }else{
            return res.json({error:"", result:"Park not found"});
        }
   });

}

exports.removePark = (req, res) => {
    Park.findByIdAndDelete(req.body.id, (err, result) => {
         if(err){
             return res.json({error:"error", result:"something went wrong"});
         }
         if(result){
             //console.log(result);
             return res.json({error:"", result:"Park removed successfully"});
         }else{
            return res.json({error:"error", result:"Park not found"});
         }
    });
 
 }
 




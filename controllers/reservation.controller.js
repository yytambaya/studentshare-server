const Reservation = require('../models/reservation.model');
const Slot = require('../models/slot.model')

exports.setReservation =  async (req, res) => {
    const reservation = new Reservation({
        parkId: req.body.parkId,
        slotId: req.body.slotId,
        userId: req.body.userId
    })
    reservation.save()
    .then( async (result) => {
        //console.log("USER ID: " + result._id);
        const slotStatusUpdate = await updateSlotStatus(1, req.body.slotId)
        if(slotStatusUpdate.status == 200){
            res.json({error: "", result: "A new reservation created successfully"})
        }else if(slotStatusUpdate.status == 404){
            res.json({error:"error", status: 404, result: "not found"})
        }else{
            res.json({error:"error", status: 500, result:"something went wrong"})
        }
    }).catch(err => {
        console.log("Error: ", err);
        res.json({error: "erorr", result: "something went wrong", })
    })

}


exports.getReservation = (req, res) => {
    
    Reservation.findOne({slotId: req.query.id}, (err, result) => {
        if(err){
            console.log("Error: ", err);
            return res.json({error:"error", result:"something went wrong"});
        }
        if(result){
            return res.json({error:"", result: result});
        }else{
            return res.json({error:"error", result:"reservation not found"});
        }
    });   

}



exports.getAllReservations = async (req, res) => {
    console.log("Getting more")   
    var returnValue = {}
    try{
       await Reservation.find({}).skip(parseInt(req.query.skip)).limit(parseInt(req.query.limit)).sort({createdAt: -1}).then(async result => {
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

exports.getAllUserReservations = async (req, res) => {
    console.log("Getting more")   
    var returnValue = {}
    try{
       await Reservation.find({_id: req.query.id}).skip(parseInt(req.query.skip)).limit(parseInt(req.query.limit)).sort({createdAt: -1}).then(async result => {
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


exports.editReservation = (req, res) => {
    const details = {
        parkId: req.body.parkId,
        slotId: req.body.slotId,
        userId: req.body.userId,
        status: req.body.status
    }

   Reservation.findByIdAndUpdate({_id: req.body.id}, details, (err, result) => {
        if(err){
            return res.json({error:"error", result:"something went wrong"});
        }
        if(result){
            console.log(result);
            return res.json({error:"", result:result});
        }else{
            return res.json({error:"", result:"Reservation not found"});
        }
   });

}

exports.revokeReservation = async (req, res) => {
    const details = {
        status: 0
    }

   Reservation.findByIdAndUpdate({_id: req.body.id}, details, async (err, result) => {
        if(err){
            return res.json({error:"error", result:"something went wrong"});
        }
        if(result){
                //console.log("USER ID: " + result._id);
            const slotStatusUpdate = await updateSlotStatus(0, req.body.slotId)
            if(slotStatusUpdate.status == 200){
                res.json({error: "", result: "Reservation revoked"})
            }else if(slotStatusUpdate.status == 404){
                res.json({error:"error", status: 404, result: "not found"})
            }else{
                res.json({error:"error", status: 500, result:"something went wrong"})
        }
        }else{
            return res.json({error:"", result:"Reservation not found"});
        }
   });

}

exports.removeReservation = (req, res) => {
    Reservation.findByIdAndDelete(req.body.id, (err, result) => {
         if(err){
             return res.json({error:"error", result:"something went wrong"});
         }
         if(result){
             //console.log(result);
             return res.json({error:"", result:"Reservation removed successfully"});
         }else{
            return res.json({error:"error", result:"Reservation not found"});
         }
    });
 
 }
 

 const updateSlotStatus = async (statusCode, id) => {
    try{
        const details = {status: statusCode}
        const result = await Slot.findByIdAndUpdate({_id: id}, details) 
        if(result){
            return {status: 200}
        }else{
            return {status: 404}
        }
   }catch(err){
        return {status: 500}
   }
}

const updateReservationStatus = async (statusCode, id) => {
    try{
        const details = {status: statusCode}
        const result = await Reservation.findByIdAndUpdate({_id: id}, details) 
        if(result){
            return {status: 200}
        }else{
            return {status: 404}
        }
   }catch(err){
        return {status: 500}
   }
}


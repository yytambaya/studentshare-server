const Share = require('../models/share.model');
const { getFromMemory } = require('../utils/common');


exports.setShare = (req, res) => {
  const fileNumber = getFromMemory('randomNumber')
  console.log("random no: " + getFromMemory('randomNumber'))
  /*if (!fileNumber) {
    return res.status(500).json({ message: 'error', data: 'something went wrong. Could not find student number' })
  }*/  
  const share = new Share({
        title: req.body.title,
        type: req.body.type,
        note: req.body.note,
        link: req.body.link,
        fileLink: fileNumber,
        userId: req.body.userId
    })
    
    share.save()
    .then( result => {
        //console.log("USER ID: " + result._id);
        return res.json({error: "", result: "A new share created successfully", })
    })
    .catch(err => {
        console.log("Error: ", err);
        res.json({error: "error", result: err, })
    })

}


exports.getShare = (req, res) => {
    
    Share.findOne({_id: req.query.id}, (err, result) => {
        if(err){
            console.log("Error: ", err);
            return res.json({error:"error", result:"something went wrong"});
        }
        if(result){
            return res.json({error:"", result: result});
        }else{
            return res.json({error:"error", result:"share not found"});
        }
    });   

}



exports.getAllShares = async (req, res) => {
    console.log("Getting more")   
    var returnValue = {}
    try{
       await Share.find({}).skip(parseInt(req.query.skip)).limit(parseInt(req.query.limit)).sort({createdAt: -1}).then(async result => {
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

exports.getAllApprovedShares = async (req, res) => {
    console.log("Getting more")   
    var returnValue = {}
    try{
       await Share.find({status: 1}).skip(parseInt(req.query.skip)).limit(parseInt(req.query.limit)).sort({createdAt: -1}).then(async result => {
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

exports.getAllRejectedShares = async (req, res) => {
    console.log("Getting more")   
    var returnValue = {}
    try{
       await Share.find({status: 0}).skip(parseInt(req.query.skip)).limit(parseInt(req.query.limit)).sort({createdAt: -1}).then(async result => {
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

exports.getUserShares = async (req, res) => {
  console.log("Getting more")   
  var returnValue = {}
  try{
     await Share.find({userId: req.query.id}).skip(parseInt(req.query.skip)).limit(parseInt(req.query.limit)).sort({createdAt: -1}).then(async result => {
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


exports.editShare = (req, res) => {
  const share = new Share({
    title: req.body.title,
    type: req.body.type,
    note: req.body.note,
    link: req.body.link,
    fileLink: req.body.fileLink,
    status: req.body.status
  })

   Share.findByIdAndUpdate({_id: req.body.id}, share, (err, result) => {
        if(err){
            return res.json({error:"error", result:"something went wrong"});
        }
        if(result){
            console.log(result);
            return res.json({error:"", result:result});
        }else{
            return res.json({error:"", result:"Share not found"});
        }
   });

}

exports.approveShare = (req, res) => {
  
     Share.findByIdAndUpdate({_id: req.body.id}, { status: 1 }, (err, result) => {
          if(err){
              return res.json({error:"error", result:"something went wrong"});
          }
          if(result){
              console.log(result);
              return res.json({error:"", result:result});
          }else{
              return res.json({error:"", result:"Share not found"});
          }
     });
  
  }
  
  exports.rejectShare = (req, res) => {
    
  
     Share.findByIdAndUpdate({_id: req.body.id}, {status: 0}, (err, result) => {
          if(err){
                console.log(err)
              return res.json({error:"error", result:"something went wrong"});
          }
          if(result){
              console.log(result);
              return res.json({error:"", result:result});
          }else{
              return res.json({error:"", result:"Share not found"});
          }
     });
  
  }

exports.removeShare = (req, res) => {
    Share.findByIdAndDelete(req.body.id, (err, result) => {
         if(err){
             return res.json({error:"error", result:"something went wrong"});
         }
         if(result){
             //console.log(result);
             return res.json({error:"", result:"Share removed successfully"});
         }else{
            return res.json({error:"error", result:"Share not found"});
         }
    });
 
 }

 exports.generateRandomNumber = async () => {
  try {
    const randomNumber = crypto.randomUUID()  
    return { status: 200, message: 'successful', data: randomNumber }
    
  }catch (error) {
    console.log('Error from generate Student: ' + error)
    return { status: 500, message: 'error', data: 'something went wrong' }
  }
}

 




const User = require('../../models/user.model');
const Admin = require('../../models/admin');
const Lit = require('../../models/lit.js');


exports.setLit = (req, res) => {
    const lit = new Lit({
        title: req.body.title,
        category: req.body.category,
        author: req.body.author,
        author_id: req.body.author_id,
        text: req.body.text, 
        status: req.body.status,
        thumbnail: req.body.thumbnail
    })
    
    lit.save()
    .then( result => {
        //console.log("USER ID: " + result._id);
        return res.json({error: "", result: "A new lit created successfully", })
    })
    .catch(err => {
        console.log("Error: ", err);
        res.json({error: "erorr", result: err, })
    })

}


exports.getLit = (req, res) => {
    
    Lit.findOne({_id: req.query.id}, (err, result) => {
        if(err){
            console.log("Error: ", err);
            return res.json({error:"error", result:"something went wrong"});
        }
        if(result){
            return res.json({error:"", result: result});
        }else{
            return res.json({error:"error", result:"Lit not found"});
        }
    });   

}



exports.getAllLits = async (req, res) => {
    console.log("Getting more")   
    var returnValue = {}
    try{
       await Lit.find({}).skip(parseInt(req.query.skip)).limit(parseInt(req.query.limit)).sort({createdAt: -1}).then(async result => {
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


exports.editLit = (req, res) => {
    const details = {
        title: req.body.title,
        category: req.body.category,
        author: req.body.author,
        author_id: req.body.author_id,
        text: req.body.text, 
        status: req.body.status,
        thumbnail: req.body.thumbnail
    }

   Lit.findByIdAndUpdate({_id: req.body.id}, details, (err, result) => {
        if(err){
            return res.json({error:"error", result:"something went wrong"});
        }
        if(result){
            console.log(result);
            return res.json({error:"", result:result});
        }else{
            return res.json({error:"", result:"Lit not found"});
        }
   });

}

exports.removeLit = (req, res) => {
    Lit.findByIdAndDelete(req.body.id, (err, result) => {
         if(err){
             return res.json({error:"error", result:"something went wrong"});
         }
         if(result){
             //console.log(result);
             return res.json({error:"", result:"Lit removed successfully"});
         }else{
            return res.json({error:"error", result:"Lit not found"});
         }
    });
 
 }
 





const Payment = require('../../models/payment');

exports.setWinner = (req, res) => {
    const details = {
        winner: "winner",
    }
   Payment.findOneAndUpdate({ticket_id: req.body.ticket_id}, details, (err, result) => {
        if(err){
            return res.json({error:"error", result:"something went wrong"});
        }
        if(result){
            console.log(result);
            return res.json({error:"", result:"New winner is set"});
        }else{
            return res.json({error:"error", result:"Ticket id does not exists"});
        }
   });

}
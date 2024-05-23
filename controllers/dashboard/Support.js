const { sendMail } = require("../../servicees/general");
const config = require('../../config');

exports.setFeedback = (req, res) => {
    var to = config.allconfig.secrets.MAIL_USERNAME;
    try{
        sendMail(req.body.email, to, req.body.title, req.body.desc)
        res.json({error:"", result: "feedback sent"});
    }catch(error){
        res.json({error: "error", result: "Something went wrong"});
    }   
}
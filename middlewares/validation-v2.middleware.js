const validator = require('../config/validate');

const signup = (req, res, next) => {
    const validationRule = {
        "name": "required|string",
        "email": "required|email|max:1000",
        "password": "required|string",
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            /*res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });*/
            res.json({error:"error", result: err})    
        } else {
            next();
        }
    });
}

const profile = (req, res, next) => {
    const validationRule = {
        "name": "required|string|max:1000"
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            /*res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });*/
            res.json({error:"error", result: err})    
        } else {
            next();
        }
    });
}

const login = (req, res, next) => {
    const validationRule = {
        "regNo": "required|string",
        "password": "required|string|min:6",   
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            /*res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });*/
            res.json({error:"error", result: err})    
        } else {
            next();
        }
    });
}

const adminLogin = (req, res, next) => {
    const validationRule = {
        "email": "required|string",
        "password": "required|string|min:6",   
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            /*res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });*/
            res.json({error:"error", result: err})    
        } else {
            next();
        }
    });
}

const program = (req, res, next) => {
    const validationRule = {
        "name": "required|string",
        "desc": "string",
        "category": "string",
        "amount_to_raise": "required|string",
        "min_amount": "required|string",
        "max_amount": "required|string",
        "period": "string",
        "winner_percentage": "string",
        "participants": "string",
        "status": "required|string",
        "assign_to": "array",
        "admin_id": "string"
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            /*res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });*/
            res.json({error:"error", result: err})    
        } else {
            next();
        }
    });
}


const leadboard = (req, res, next) => {
    const validationRule = {
        "prog_id": "required|string",
        "user_id": "required|string",
        "win_amount": "required|string",
        "win_method": "required|string",
        "status": "required|String"
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            /*res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });*/
            res.json({error:"error", result: err})    
        } else {
            next();
        }
    });
}

const payment = (req, res, next) => {
    const validationRule = {
        "user_id": "required|string",
        "type": "required|string",
        "amount": "required|string",
        "winner": "string",
        "status": "string",
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            /*res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });*/
            res.json({error:"error", result: err})    
        } else {
            next();
        }
    });
}

const validateEmail = (req, res, next) => {
    const validationRule = {
        "email": "required|email",  
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            /*res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });*/
            res.json({error:"error", result: err})    
        } else {
            next();
        }
    });
}


const validateTitle = (req, res, next) => {
    const validationRule = {
        "title": "required|string",   
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            /*res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });*/
            res.json({error:"error", result: err})    
        } else {
            next();
        }
    });
}


const validateDescription = (req, res, next) => {
    const validationRule = {
        "desc": "string",   
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            /*res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });*/
            res.json({error:"error", result: err})    
        } else {
            next();
        }
    });
}

const validateDate = (req, res, next) => {
    const validationRule = {
        "date": "required|date",   
    }
    validator(req.query, validationRule, {}, (err, status) => {
        if (!status) {
            /*res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });*/
            res.json({error:"error", result: err})    
        } else {
            next();
        }
    });
}

const validateDateType = ((req, res, next) => {
    var date_type = req.query.date_type; 
    //res.json({error:"error", result:"unknown"});
    if(date_type != "" && date_type != undefined){
        if(date_type == "day" || date_type == "week" || date_type == "month" || date_type == "year" || date_type == "hour" || date_type == "minute"){
            //res.json({error: "", result: "valid email address"});
              next();  
        }else{
            res.json({error: "error", result: "invalid date category address"})    
        }
    }else{
        res.json({error: "error", result: "date category is empty"})
    }
    return res;
})

const validatePassword = (req, res, next) => {
    const validationRule = {
        "password": "required|string|min:6",   
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            /*res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });*/
            res.json({error:"error", result: err})    
        } else {
            next();
        }
    });
}

const validateID = (req, res, next) => {
    const validationRule = {
        "id": "required|string"   
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            /*res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });*/
            res.json({error:"error", result: err})    
        } else {
            next();
        }
    });
}

const validateIDGet = (req, res, next) => {
    const validationRule = {
        "id": "required|string"   
    }
    validator(req.query, validationRule, {}, (err, status) => {
        if (!status) {
            /*res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });*/
            res.json({error:"error", result: err})    
        } else {
            next();
        }
    });
}

const validateUserID = (req, res, next) => {
    const validationRule = {
        "user_id": "required|string"   
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            /*res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });*/
            res.json({error:"error", result: err})    
        } else {
            next();
        }
    });
}

const validateUserIDPost = (req, res, next) => {
    const validationRule = {
        "user_id": "required|string"   
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            /*res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });*/
            res.json({error:"error", result: err})    
        } else {
            next();
        }
    });
}
const validateUserIDGet = (req, res, next) => {
    const validationRule = {
        "user_id": "required|string"   
    }
    validator(req.query, validationRule, {}, (err, status) => {
        if (!status) {
            /*res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });*/
            res.json({error:"error", result: err})    
        } else {
            next();
        }
    });
}

const validateTransactionID = (req, res, next) => {
    const validationRule = {
        "transaction_id": "required|string"   
    }
    validator(req.query, validationRule, {}, (err, status) => {
        if (!status) {
            /*res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });*/
            res.json({error:"error", result: err})    
        } else {
            next();
        }
    });
}

const validateProgramID = (req, res, next) => {
    const validationRule = {
        "program_id": "required|string"   
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            /*res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });*/
            res.json({error:"error", result: err})    
        } else {
            next();
        }
    });
}

const validateTicketIDPost = (req, res, next) => {
    const validationRule = {
        "ticket_id": "required|string"   
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            /*res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });*/
            res.json({error:"error", result: err})    
        } else {
            next();
        }
    });
}

const validateRaffleDrawType = ((req, res, next) => {
    var type = req.query.type;
    //var res.json({error:"error", result:"Unknown"});
    if(type != "" && type != undefined){
        //res.json({error:"", result:"This id is valid"});
        if(type == "daily" || type == "weekly" || type == "monthly" || type == "assigned" || type == "notAssigned"  || type == "all"){
            next();
        }else{
            res.json({error: "error", result: "raffle draw type is invalid"})
        }

    }else{
        res.json({error: "error", result: "raffle draw type is empty"})
    }
    return res;
});

const validateStatusType = ((req, res, next) => {
    var status = req.query.status;
    //var res.json({error:"error", result:"Unknown"});
    if(status != "" && status != undefined){
        //res.json({error:"", result:"This id is valid"});
        if(status == "pending" || status == "accepted" || status == "rejected" || status== "all"){
            next();
        }else{
            res.json({error: "error", result: "program status is invalid"})
        }

    }else{
        res.json({error: "error", result: "program status is empty"})
        
    }
    return res;
});

//Lit
const lit = (req, res, next) => {
    const validationRule = {
        "title": "required|string",
        "category": "required|string",
        "author": "required|string",
        "author_id": "required|string",
        "text": "required|string",
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            /*res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });*/
            res.json({error:"error", result: err})    
        } else {
            next();
        }
    });
}

const user = (req, res, next) => {
    const validationRule = {
        "name": "required|string",
        "email": "required|email|max:1000",
        "phoneNumber": "required|digits:11",
        "status": "required"
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            /*res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });*/
            res.json({error:"error", result: err})    
        } else {
            next();
        }
    });
}
const park = (req, res, next) => {
    const validationRule = {
        "name": "required|string|max:1000"
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            /*res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });*/
            res.json({error:"error", result: err})    
        } else {
            next();
        }
    });
}

const slot = (req, res, next) => {
    const validationRule = {
        "name": "required|string|max:1000",
        "parkId": "required|string"
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            /*res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });*/
            res.json({error:"error", result: err})    
        } else {
            next();
        }
    });
}

const reservation = (req, res, next) => {
    const validationRule = {
        "parkId": "required|string",
        "slotId": "required|string",
        "userId": "required|string"
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            /*res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });*/
            res.json({error:"error", result: err})    
        } else {
            next();
        }
    });
}
const revoking = (req, res, next) => {
    const validationRule = {
        "slotId": "required|string"
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            /*res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });*/
            res.json({error:"error", result: err})    
        } else {
            next();
        }
    });
}

const share = (req, res, next) => {
    const validationRule = {
        "title": "required|string|max:1000",
        "note": "string",
        "link": "string",
        "fileLink": "string",
        "userId": "required|string"
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            /*res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });*/
            res.json({error:"error", result: err})    
        } else {
            next();
        }
    });
}

const shareStatus = (req, res, next) => {
    const validationRule = {
        "status": "required|string|max:1000",
        "note": "string",
        "link": "string",
        "fileLink": "string",
        "userId": "required|string"
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            /*res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });*/
            res.json({error:"error", result: err})    
        } else {
            next();
        }
    });
}


module.exports = { 
  signup,
  profile,
  login,
  adminLogin,
  program,
  leadboard,
  payment,
  lit,
  user,
  park,
  slot,
  reservation,
  revoking,
  share,
  validateEmail,
  validateTitle,
  validateDescription,
  validateDate,
  validateDateType,
  validateID,
  validateIDGet,
  validateUserID,
  validateUserIDGet,
  validateUserIDPost,
  validateTransactionID,
  validateProgramID,
  validateTicketIDPost,
  validatePassword,
  validateRaffleDrawType,
  validateStatusType
}
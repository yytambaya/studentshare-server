const { body, validationResult } = require('express-validator')
const reg_name = /^[a-zA-Z0-9#$()!<>\//s]{2,30}/
const reg_id = /^[A-Za-z0-9]{1,}$/ 
const reg_email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
//const  reg_name = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/;
//const reg_password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;
const reg_password = /^[A-Za-z0-9]{6,50}/ 
const reg_desc = /[A-Za-z0-9!@#$%&*()-_+=:;\/.]{0,200}/;
const reg_url = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
const reg_type = /^[A-Za-z0-9]{1,50}$/;

const validateEmail = ((req, res, next) => {
    var email = req.body.email; 
    //res.json({error:"error", result:"unknown"});
    if(email != "" && email != undefined){
        if(reg_email.test(email)){
            //res.json({error: "", result: "valid email address"});
              next();  
        }else{
            res.json({error: "error", result: "inavlid email address"})    
        }
    }else{
        res.json({error: "error", result: "email address is empty"})
    }
    return res;
})

const validatePassword = ((req, res, next) => {
    var password = req.body.password;
    //var res.json({error:"error", result:"Unknown"});
    if(password != "" && password != undefined){
        if(reg_password.test(password)){
            //res.json({error:"", result:"password is valid"});
            next();
        }else{
            res.json({error: "error", result: "inavlid password"})    
        }
    }else{
        res.json({error: "error", result: "password is empty"})
    }
    return res;
})

const validateName = ((req, res, next) => {
  var name = req.body.name;
  //var res.json({error:"error", result:"Unknown"});
  if(name != "" && name != undefined){
      if(reg_name.test(name)){
          //res.json({error:"", result:"name is valid"});
          next();
      }else{
          res.json({error: "error", result: "invalid name"})    
      }
  }else{
      res.json({error: "error", result: "name is empty"})
  }
  return res;
});

const validateDescription = ((req, res, next) => {
  //var res.json({error:"error", result:"Unknown"});
  var desc = req.body.desc;
  if(desc != "" && desc != undefined){
      if(reg_desc.test(desc)){
         // res.json({error:"", result:"description is valid"});
        next();
    }else{
          res.json({error: "error", result: "invalid description"})    
      }
  }else{
      //res.json({error: "error", result: "description is empty"})
    next();
  }
  return res;
});

const validateLink = ((req, res, next) => {
  var link = req.body.link;
  //var res.json({error:"error", result:"Unknown"});
  if(link != "" && link != undefined){
      if(reg_url.test(link)){
          //res.json({error:"", result:"link is valid"});
          next();
      }else{
          res.json({error: "error", result: "invalid link"})    
      }
  }else{
      res.json({error: "error", result: "link is empty"})
  }
  return res;
});

const validateID_post = ((req, res, next) => {
  var id = req.body.id;  
  //var res.json({error:"error", result:"Unknown"});
  if(id != "" && id != undefined){
      if(reg_id.test(id)){
          //res.json({error:"", result:"ID is valid"});
          next();
      }else{
          res.json({error: "error", result: "invalid ID"})    
      }
  }else{
      res.json({error: "error", result: "ID is empty"})
  }
  return res;
});

const validateID_get = ((req, res, next) => {
    var id = req.query.id;  
    //var res.json({error:"error", result:"Unknown"});
    if(id != "" && id != undefined){
        if(reg_id.test(id)){
            //res.json({error:"", result:"ID is valid"});
            next();
        }else{
            res.json({error: "error", result: "invalid ID"})    
        }
    }else{
        res.json({error: "error", result: "ID is empty"})
    }
    return res;
  });

const validatePaymentType = ((req, res, next) => {
  var type = req.body.type;
  //var res.json({error:"error", result:"Unknown"});
  if(type != "" && type != undefined){
      if(reg_type.test(type)){
          //res.json({error:"", result:"type is valid"});
          next();
      }else{
          res.json({error: "error", result: "invalid type"})    
      }
  }else{
      res.json({error: "error", result: "type is empty"})
  }
  return res;
});

const validateTransactionID = ((req, res, next) => {
    var id = req.query.transaction_id;
    //var res.json({error:"error", result:"Unknown"});
    if(id != "" && id != undefined){
        //res.json({error:"", result:"This id is valid"});
        next();
    }else{
        res.json({error: "error", result: "transaction id is empty"})
    }
    return res;
});
  
const validateToken = ((req, res, next) => {
    var id = req.query.token;
    //var res.json({error:"error", result:"Unknown"});
    if(id != "" && id != undefined){
        //res.json({error:"", result:"This id is valid"});
        next();
    }else{
        res.json({error: "error", result: "token is empty"})
    }
    return res;
});

const validateParentID = ((req, res, next) => {
    var id = req.body.parent_id;
    //var res.json({error:"error", result:"Unknown"});
    if(id != "" && id != undefined){
        //res.json({error:"", result:"This id is valid"});
        next();
    }else{
        res.json({error: "error", result: "parent id is empty"})
    }
    return res;
});

const validateParentName = ((req, res, next) => {
    var parent_name = req.body.parent_name; 
    //res.json({error:"error", result:"unknown"});
    if(parent_name != "" && parent_name != undefined){
        if(reg_name.test(parent_name)){
            //res.json({error: "", result: "valid email address"});
              next();  
        }else{
            res.json({error: "error", result: "invalid parent name"})    
        }
    }else{
        res.json({error: "error", result: "parent name is empty"})
    }
    return res;
})

const validateCollectionID_post = ((req, res, next) => {
    var id = req.body.col_id;
    //var res.json({error:"error", result:"Unknown"});
    if(id != "" && id != undefined){
        //res.json({error:"", result:"This id is valid"});
        next();
    }else{
        res.json({error: "error", result: "collection id is empty"})
    }
    return res;
});

const validateCollectionID_get = ((req, res, next) => {
    var id = req.query.col_id;
    //var res.json({error:"error", result:"Unknown"});
    if(id != "" && id != undefined){
        //res.json({error:"", result:"This id is valid"});
        next();

    }else{
        res.json({error: "error", result: "collection id is empty"})
    }
    return res;
});
//alert(validateEmail("hjsjsj@gmail.com").result);
//alert(validatePassword("hsjhsjs").result);

const validateResourceID_post = ((req, res, next) => {
    var id = req.body.res_id;
    //var res.json({error:"error", result:"Unknown"});
    if(id != "" && id != undefined){
        //res.json({error:"", result:"This id is valid"});
        next();

    }else{
        res.json({error: "error", result: "resource id is empty"})
    }
    return res;
});

const validateResourceID_get = ((req, res, next) => {
    var id = req.query.res_id;
    //var res.json({error:"error", result:"Unknown"});
    if(id != "" && id != undefined){
        //res.json({error:"", result:"This id is valid"});
        next();

    }else{
        res.json({error: "error", result: "resource id is empty"})
    }
    return res;
});

const userValidationRules = () => {
  return [
    // username must be an email
    body('email').isEmail(),
    // password must be at least 5 chars long
    body('password').isLength({ min: 5 }),
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
  userValidationRules,
  validate,
  validateName: validateName,
  validateDescription: validateDescription,
  validateEmail: validateEmail,
  validatePassword: validatePassword,
  validateID_post: validateID_post,
  validateID_get: validateID_get,  
  validateLink: validateLink,
  validatePaymentType: validatePaymentType,
  validateToken,
  validateParentID,
  validateParentName,
  validateTransactionID,
  validateCollectionID_get,
  validateCollectionID_post,
  validateResourceID_get,
  validateResourceID_post
}
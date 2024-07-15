const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const request = require("request");
const jwt = require("jsonwebtoken");
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const nodemailer = require("nodemailer");
const mg = require("nodemailer-mailgun-transport")
const mailgun = require("mailgun-js");
const handlebars = require("handlebars")
const fs = require("fs")
const config = require("../config");
//const User = require("../models").userme; 
const User = require("../models/user.model.js");
const Admin = require("../models/admin");
const ForgotPassword = require("../models/passowordreset.model");
const Subscription = require("../models/subscription.model");
const NewsLetterSubscription = require("../models/subscription");
const { post } = require("request");
const { response } = require("express");
const General = require("./general.controller");
const dayjs = require('dayjs');
const middlewares = require("../middlewares");
const { getAppURL, getSiteURL } = require("../servicees/general");
const API_BASE_URL =  config.allconfig.App.ENV == "PROD" ? config.allconfig.App.PROD_API_URL : config.allconfig.App.DEV_API_URL;
const SITE_BASE_URL = config.allconfig.App.ENV == "PROD" ? config.allconfig.App.PROD_SITE_URL : config.allconfig.App.DEV_SITE_URL;
const APP_BASE_URL = config.allconfig.App.ENV == "PROD" ? config.allconfig.App.PROD_APP_URL : config.allconfig.App.DEV_SITE_URL;

//const { sendMail } = require("./general.controller");
//const user = require('./user.model');
//const User = mongoose.model("User");
    
exports.signUp = (req, res) => {
        
    const user = new User({
        email: req.body.email,
        name: req.body.name,
        password: bcrypt.hashSync(req.body.password, 8)
    })

    user.save()
    .then( result => {
        console.log("USER ID: " + result._id);
        generatePasswordResetToken(result._id, "accountactivation")
        .then( token_info => {
            var from = "Cryptolits <support@Cryptolits.com>";
            var to = req.body.email;
            var subject = "Cryptolits Account Verification"; 
            var link = token_info.link; 
            var text = `<p>Thank you for signing up.</p><p>Activate your account to login and start exploring Cryptolits</p><a href=${link}>verify</a>`; //link;
            //const emailTemplateSource = fs.readFileSync(path.join(__dirname, "/template.hbs"), "utf8");
            //const template = handlebars.compile(emailTemplateSource);
            //const text2 = template({message: "Hello!"})
            sendMail2(from, to, subject, text);
        //return res.json({error:"", result:{spr_result}});
        return res.json({error: "", status: 200, result: "Signed up successfully", })
        })
        .catch( err => {
            res.json({error: "error", error: 500, result: "Something went wrong mail"});
        })
        
    })
    .catch(err => {
        console.log("Error: ", err);
        res.json({error: "erorr", status: 500, result: err, })
    })

}

exports.subscribe = (req, res) => {
        
    const subscriber = new NewsLetterSubscription({
        email: req.body.email,
        name: req.body.name,
    })

    subscriber.save()
    .then( result => {
        console.log("USER ID: " + result._id);
        generatePasswordResetToken(result._id, "accountactivation")
        .then( token_info => {
            var from = "Cryptolits <support@Cryptolits.com>";
            var to = req.body.email;
            var subject = "Cryptolits Newsletter Subscription"; 
            var link = token_info.link; 
            var text = `<p>Thank you for signing up for Cryptolits Newsletter.</p><p>We are happy to bring you on board`; //link;
            //const emailTemplateSource = fs.readFileSync(path.join(__dirname, "/template.hbs"), "utf8");
            //const template = handlebars.compile(emailTemplateSource);
            //const text2 = template({message: "Hello!"})
            sendMail2(from, to, subject, text);
        //return res.json({error:"", result:{spr_result}});
        return res.json({error: "", result: "Subscribed up successfully", })
        })
        .catch( err => {
            res.json({error: "error", result: "Something went wrong mail"});
        })
        
    })
    .catch(err => {
        console.log("Error: ", err);
        res.json({error: "erorr", result: 'something went wrong', })
    })

}

exports.adminSignUp = (req, res) => {
        
    const admin = new Admin({
        email: req.body.email,
        name: req.body.name,
        password: bcrypt.hashSync(req.body.password, 8)
    })

    admin.save()
    .then( result => {
        console.log("USER ID: " + result._id);
        generatePasswordResetToken(result._id, "accountactivation")
        .then( token_info => {
            var from = "Cryptolits <support@Cryptolits.com>";
            var to = req.body.email;
            var subject = "Cryptolits Admin"; 
            var link =  SITE_BASE_URL + "/login"; 
            var text = "<p>You have been signed up as an Admin for Cryptolits!</p><p>Kindly use these details to login</p><p>" + "Username: " + req.body.email + " Password: " + req.body.password + "</p><a href=" + link + ">Login</a>"; //link;
            //const emailTemplateSource = fs.readFileSync(path.join(__dirname, "/template.hbs"), "utf8");
            //const template = handlebars.compile(emailTemplateSource);
            //const text2 = template({message: "Hello!"})
            sendMail2(from, to, subject, text);
        //return res.json({error:"", result:{spr_result}});
        return res.json({error: "", status:200, result: "Signed up successfully", })
        })
        .catch( err => {
            res.json({error: "error", status: 500, result: "Something went wrong mail"});
        })
        
    })
    .catch(err => {
        console.log("Error: ", err);
        res.json({error: "error", status: 500, result: 'something went wrong', })
    })

}


exports.addUser = (newUser) => {

    middlewares.Auth.googleAccountExists(newUser.sub).then( res => {
        if(res.result == "NO_ACCOUNT"){
            const user = new User({
                googleId: newUser.sub,
                email: newUser.email,
                name: newUser.name,
                picture: newUser.picture
            })
        
        
            user.save()
            .then( result => {
                console.log("USER ID: " + result);
                //generatePasswordResetToken(result._id, "accountactivation")
                //.then( token_info => {
                    var from = "Cryptolits <support@Cryptolits.com>";
                    var to = result.email;
                    var subject = "Cryptolits Account Verification"; 
                    var link = token_info.link; 
                    var text = `<p>Thank you for signing up.</p><p>Your Account is active. You can login and start exploring Cryptolits</p><a href=${SITE_BASE_URL} + "/login"/>verify</a>`; //link;
                    //const emailTemplateSource = fs.readFileSync(path.join(__dirname, "/template.hbs"), "utf8");
                    //const template = handlebars.compile(emailTemplateSource);
                    //const text2 = template({message: "Hello!"})
                    sendMail2(from, to, subject, text);
                //return res.json({error:"", result:{spr_result}});
                //return res.json({error: "", result: "Signed up successfully", })
                console.log("Signed up successfully!")
                //})
                //.catch( err => {
                    //res.json({error: "error", result: "Something went wrong mail"});
                    console.log("Error: " + err)
               // })
            })

        }else if(res.result == "ACCOUNT_EXISTS"){
            console.log("This account exists")
        }else{
            console.log("Error: " + res.result)
        }
    }).catch(error => {
        console.log("Error: " + error);
    })



        
} 


exports.signUpWithGoogle = (req, res) => {
    //res.json({error:"", result: req.user})  
    
    //res.json({error:"", result: user});
    middlewares.Auth.googleAccountExists(newUser.sub).then( res => {
        if(res.result == "NO_ACCOUNT"){
            const user = new User({
                googleId: newUser.sub,
                email: newUser.email,
                name: newUser.name,
                picture: newUser.picture
            })
        
        
            user.save()
            .then( result => {
                console.log("USER ID: " + result);
                //generatePasswordResetToken(result._id, "accountactivation")
                //.then( token_info => {
                    var from = "Cryptolits <support@Cryptolits.com>";
                    var to = result.email;
                    var subject = "Cryptolits Account Verification"; 
                    var link = token_info.link; 
                    var text = `<p>Thank you for signing up.</p><p>Your Account is active. You can login and start exploring Cryptolits</p><a href=${SITE_BASE_URL} + "/login"/>verify</a>`; //link;
                    //const emailTemplateSource = fs.readFileSync(path.join(__dirname, "/template.hbs"), "utf8");
                    //const template = handlebars.compile(emailTemplateSource);
                    //const text2 = template({message: "Hello!"})
                    sendMail2(from, to, subject, text);
                //return res.json({error:"", result:{spr_result}});
                //return res.json({error: "", result: "Signed up successfully", })
                console.log("Signed up successfully!")
                //})
                //.catch( err => {
                    //res.json({error: "error", result: "Something went wrong mail"});
                    console.log("Error: " + err)
               // })
            })

        }else if(res.result == "ACCOUNT_EXISTS"){
            console.log("This account exists")
        }else{
            console.log("Error: " + res.result)
        }
    }).catch(error => {
        console.log("Error: " + error);
    })



}


exports.reactivate = (req, res) => {
    //return res.json({error:"error", result:"Reactivation"});
    User.findOne({email:req.body.email}, (err, result) => {
        if(err){
            console.log("Activation Error: " + err);
            return res.json({error:"error", result:"something went wrong fromm the server"});
        }
        if(result){
            if(result.status == 0){
                generatePasswordResetToken(result._id, "accountactivation")
                .then( token_info => {
                    var from = "Cryptolits Excited User <support@Cryptolits.com>";
                    var to = req.body.email;
                    var subject = "Cryptolits Account Verification"; 
                    var link = token_info.link; 
                    var text = "<p>Thank you for signing up.</p><p>Activate your account to login and start exploring Cryptolits</p><a href=" + link + ">verify</a>"; //link;
                    sendMail2(from, to, subject, text);
                    return res.json({error:"", result:"Email is successfully sent"});
                })
                .catch(error => {
                    return res.json({error:"error", result:"Something went wrong. try again"});
                })

            }else{
                return res.json({error:"error", result:"Your account is already verified!"})
            }
        }else{
            return res.json({error:"error", result:"Account not found. Create a new one!"})
        }
    });

}

exports.signIn = (req, res) => {
        
    const user = new User({
        email: req.body.email
    })
    //console.log("Email: " + req.body.email, "Password: " + req.body.password)
    User.findOne({email: req.body.email}, (err, result) => {
        if(err){
            console.log("Error: ", err);
            return res.json({error:"error", status: 500, result:"something went wrong"});
        }
        if(result){
            //process.env.login_token_secret
            const isValidPassword = bcrypt.compareSync(req.body.password, result.password);
            if(!isValidPassword){
               return res.json({error:"error", status: 404, result:"email or password is incorrect"});
            }
            if(false){
                return res.json({error:"error", result:"Verify your account"});
            }else{
                console.log("My User ID: " + result._id)
                console.log(result);
                const temp_sec = 'tamuysyusghd';
                const token = jwt.sign({email: req.body.email}, config.allconfig.temp_var.token_secret, {expiresIn: '86400s'}); 
                return res.json({error:"", code:400, status:200, result:{token: token, result}});
            }   
        }else{
            return res.json({error:"error", status: 404, result:"username or password is incorrect"});
        }
     
    });
};    



exports.adminSignIn = (req, res) => {
        
    const admin = new Admin({
        email: req.body.email
    })
    //console.log("Email: " + req.body.email, "Password: " + req.body.password)
    Admin.findOne({email: req.body.email}, (err, result) => {
        if(err){
            console.log("Error: ", err);
            return res.json({error:"error", status: 500, result:"something went wrong"});
        }
        if(result){
            //process.env.login_token_secret
            const isValidPassword = bcrypt.compareSync(req.body.password, result.password);
            if(!isValidPassword){
               return res.json({error:"error", status:404, result:"email or password is incorrect"});
            }
            if(result.role == 0){
                return res.json({error:"error", status: 405, result:"Unauthorized!"});
            }else{
                console.log("My User ID: " + result._id)
                console.log(result);
                
                        const temp_sec = 'tamuysyusghd';
                        const token = jwt.sign({email: req.body.email}, config.allconfig.temp_var.token_secret, {expiresIn: '86400s'}); 
                        //temp_sec should be replaced by process.env....
                        return res.json({error:"", status: 200, result:{token: token, role: result.role, result}});
            }
        }else{
            return res.json({error:"error", status: 404, result:"username or password is incorrect"});
        }
    });   

}


const isSubscriptionActive = (date) => {
    
}


/*exports.logout = (req, res) => {
    
}*/


exports.forgotPassword = async (req, res) => {
        
    const user = new User({
        email: req.body.email
    })

    User.findOne({email: req.body.email}, (err, result) => {
        if(err){
            console.log("Error: ", err);
            return res.json({error:"error", result:"something went wrong 0"});
        }
        if(result){
            if(result.status == "1"){

            ForgotPassword.findOneAndUpdate({user_id:result._id}, {status: 1}, (err, pr_result) => {
                if(err){
                    console.log("Error 1: ", err);
                    return res.json({error:"error", result:"something went wrong 1"}); 
                }
                console.log(pr_result);    
            });
               
            var token_info = generatePasswordResetToken(result._id, "passwordreset")
            .then((t_result) => {

            //var  token = token_info.token;
            if(t_result){
            
            var  token = t_result.token;
            var link = t_result.link;
            //var link =  "http://localhost:9000/reset?token=$2b$10$BsMZuQQ.zUCTuyZxTMbXJeHJliDajMObXELwzDhouX0rg/f4caw.O&id=608a985c7564912410098875" 
            //console.log("MToken: " + token + "Link: " + link);
            var from = "Cryptolits <support@Cryptolits.com>";
            var to = result.email;
            var subject = "Cryptolits Password Reset"; 
            //var link = "http://localhost:9000/%R&GU(!E#F^*D@VILDU?090-2jdjn"; 
            var text = "<div style='color:black'><p>Hello, There was recently a request to change the password on your account</p> <p>if it's not you, ignore and never grant anyone access to your account</p> <p>If it's you, click the button below to reset your password.</p><a style='background:'#F53855'; color:white; width:150px; height:100px; align:centre' href=" + link + ">Reset Passowrd</a></div>"; //link;
            //sendMail(from, to, subject, text);
            //var mailer = sendMail(from, to, subject, text)
            //return res.json(mailer);
            //console.log(mailer);
                var passwordReset = new ForgotPassword({
                    token: token,
                    user_id: result._id
                })
                .save()
                .then( spr_result => {
                    if(spr_result){
                        //var from = config.allconfig.secrets.MAIL_USERNAME;
                        //var to = result.email;
                        //var subject = "Cryptolits Password Reset"; 
                        //var link = "http://localhost:9000/%R&GU(!E#F^*D@VILDU?090-2jdjn"; 
                        //var text = "<a href=" + link + ">reset</a>"; //link;*/
                        sendMail2(from, to, subject, text);
                        //console.log("Mailer is ok. Password rest id is saved")*/
                        return res.json({error:"", result:{spr_result}});
                    }
                })
                .catch( err => {
                    if(err){
                        console.log(err);
                        return res.json({error:"error", result:"something went wrong 2: " + err});
                    }    
                })
            
            }else{
                console.log("Errorrrrrrrrrr");
                return res.json({error:"error", result:"something went wrong 3: "}); 
            } 
        });

        }else{
            return res.json({error:"error", result:"Activate your account first!"});
        }

        }else{
            return res.json({error:"error", result:"username not found"});
        }
    });   

}

exports.verifyAccount = (req, res) => { 
    User.findOneAndUpdate({_id: req.query.id}, {status: 1}, (err, result) => {
        if(err){
            res.redirect(`${SITE_BASE_URL}/response/error`)   
            //return res.json({error:"error", result:"something wrong happened"});
        }
        if(result){
            res.redirect(`${SITE_BASE_URL}/response/activation`)
            //return res.json({error:"", result:"Account is activated"});
        }else{
            return res.json({error:"error", result:"Invalid verification"});
        }
    });
}

exports.passwordReset = (req, res) => {
    //console.log("Password reset here!")
    //res.json({token: req.query.token, id:req.query.id});
    
    ForgotPassword.findOne({
        token: req.query.token,
        status: 0,
        user_id: req.query.id
    }, (err, result) => {
        if(err){
            return res.json({error:"error", result:"something went wrong"});
        }
        if(result){
            const temp_sec = 'tamuysyusghd'; //replace process.env.temp_sec
            //const token = jwt.sign({id: req.query.id}, config.allconfig.temp_var.token_secret, {expiresIn: '86400s'});     
            const token = encrypt(process.env.API_KEY_PASSWORD_RESET);
            const user_id = req.query.id;
            //console.log("Site URL: " + getAppURL())
            res.redirect(`${APP_BASE_URL}/resetpassword/` + token + '/' + user_id);
            //return res.json({error:"", result:{pr_token: token}});
        }else{
            res.redirect(`${SITE_BASE_URL}/response/error`)
            //return res.json({error:"error", result:"inavlid activation link or link has expired!"});
        }
    });

    /*ForgotPassword.find
    User.findByIdAndUpdate({_id: user_id}, {password: newpassword}, (err, result) => {
        if(err){
            return res.json({error:"error", result:"something wrong happened"});
        }
        if(result){
            return res.json({error:"", result:"Password is successfully updated"});
        }
    });*/
}

exports.newPassword = (req, res) => {
    var password = bcrypt.hashSync(req.body.password, 8);
   User.findByIdAndUpdate(req.body.id, {password: password}, (err, result) => {
        if(err){
            //res.redirect(`${process.env.VIEW_TEST_URL}/next`)
            return res.json({error:"error", result:"something went wrong newpassword"});
        }
        if(result){
            //res.redirect(`${process.env.VIEW_TEST_URL}/account/passwordreset`)
            //console.log(result);
            return res.json({error:"", result:"Password updated successfully"});
        
        }else{
            return res.json({error:"error", result:"User not found"});
        }
   });


}

exports.pay = async (req, res) => {
    if(req.body.type == "once"){
        amount = config.allconfig.Payment.once_amount;
        payment_plan = config.allconfig.Payment.onetime_plan_id;
    }else if(req.body.type == "monthly"){
        amount = config.allconfig.Payment.monthly_amount;
        payment_plan = config.allconfig.Payment.monthly_plan_id;
    }else if(req.body.type == "yearly"){
        amount = config.allconfig.Payment.yearly_amount;
        payment_plan = config.allconfig.Payment.yearly_plan_id;
    }else{
        amount = config.allconfig.Payment.once_amount;
        payment_plan = config.allconfig.Payment.onetime_plan_id;
    }
    var payment_info = await pay(req.body.email, amount, req.body.id, payment_plan)
    return res.json(payment_info);
  
};

exports.verifyPayment = (req, res) => {
    axios({    
        method: 'GET',
        url: "https://api.flutterwave.com/v3/transactions/" + req.query.transaction_id + "/verify",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + config.allconfig.Payment.FLUTTER_SEC_KEY
        }
        
    })
    .then( axios_res => {
        console.log(axios_res.data.data.customer.name);
        //return res.json({result: "Good"});
        if(axios_res.data.status == "success" && axios_res.data.data.currency == "USD"){
            var old_user_id =  axios_res.data.data.customer.name;
            var user_id = old_user_id.substring(0, (old_user_id.length-1))
            var type = "";
            var expiry_date = null;
            var date = dayjs();

            if(axios_res.data.data.amount == config.allconfig.Payment.once_amount){
                type = "once";
                //return res.json({result: "Currency and tarscation is ok. Type of payment: Once"});
            }else if(axios_res.data.data.amount == config.allconfig.Payment.monthly_amount){
                type = "monthly";
                end_date = date.add(1, "month").format();
                expiry_date = dayjs(end_date)
                //return res.json({result: "Currency and tarscation is ok. Type of payment: monthly"});
            }else if(axios_res.data.data.amount == config.allconfig.Payment.yearly_amount){
                type = "yearly";
                end_date = date.add(1, "year").format();
                expiry_date = dayjs(date.add(1, "year").format());
                //return res.json({result: "Currency and tarscation is ok. Type of payment: yearly"});
            }else{
                type = "none";
                //return res.json({result: "Currency and tarscation is ok. Type of payment: Unknown"});
            }
            if(type && user_id){
                //expiry_date = dayjs(date.add(2, "minute").format());
                const subscription = new Subscription({
                    type: type,
                    user_id: user_id,
                    end_date: end_date,
                })

                subscription.save()
                .then(sub_result => {
                    //console.log(sub_result);
                    res.redirect(`${SITE_BASE_URL}/dashboard`)
                    //res.json({error:"", result:"Payment verified"});
                })
                .catch(sub_err => {
                    console.log(sub_err);
                    res.json({error:"error", result:"Something went wrong 1"});
                })
            }else{
                
                res.json({error:"error", result:"Something went wrong 2"});
            }

        }
    })
    .catch( err => {
        //console.log(err);
        res.json({error: "error", result: "Something went wrong 3"});
    })

}



const pay = async (email, amount, user_id, payment_plan) => {
    const tx_ref = uuidv4();
    //add payment plan
    let response = {};
    const onetime_payment = {
        "tx_ref": tx_ref,
        "currency":"USD",
        "amount": amount,
        "payment_plan": payment_plan,
        "redirect_url":"http://localhost:9000/verifypayment",
        "payment_options":"card",
        "customer":{
           "email":email,
           "name": user_id
        },
        "customizations":{
           "title":"Cryptolits",
           "description":"An arranged one-click bookmarking app"
        }
     }

     await axios({
        method: "POST",
        url: "https://api.flutterwave.com/v3/payments",
        data: onetime_payment,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + config.allconfig.Payment.FLUTTER_SEC_KEY
        }
     })
     .then(axios_res => {
        console.log(axios_res);
        if(axios_res.data.status == "success"){
           response  = {error: "", result: axios_res.data.data.link}; 
        }else{
            response = {error: "error", result: "Something went wrong"};
        }
    })
     .catch(axios_err => {
        console.log(axios_err);
        response = {error: "error", result: "Something went wrong"};
     })
     return  response;
}



const generatePasswordResetToken = async (user_id, type) => {
    //var token = ;
    //replace it with process.env.passwordreset_secret
    var passwordreset_secret = "56278t7hbdjksji";
    let resetToken = crypto.randomBytes(32).toString("hex");
    const hash_resetToken = await bcrypt.hash(resetToken, Number(passwordreset_secret));
    var link = "none"; 
    //var link_frac = "passwordReset?token=" + resetToken + "&key=" + passwordreset_secret  + "&id=" + user_id;
    //var hash_link_frac = await bcrypt.hash(link_frac, Number(user_id));
    if(type == "passwordreset"){
        link = API_BASE_URL + "/v1/reset?token=" +  hash_resetToken + "&id=" + user_id;
        //console.log("Reset Link:" + link)
        //console.log("API URL + " + API_BASE_URL)
    }else if(type == "accountactivation"){
        link = API_BASE_URL + "/v1/activate?token=" +  hash_resetToken + "&id=" + user_id;
    }else{
        link = "none";
    }
    console.log(hash_resetToken);
    return ({token:hash_resetToken, link: link});
}

exports.getSubscription = (req, res) => {
        
    Subscription.findOne({user_id: req.query.id}, (err, result) => {
        if(err){
            console.log("Error: ", err);
            return res.json({error:"error", result:"something went wrong"});
        }
        if(result){
            return res.json({error:"", result: [result]});
            //return res.json({error:"", result: {type:"Monthly", start_date:"02-04-21", end_date: "03-04-21"}});
        }else{
            //return res.json({error:"", result: {type:"Monthly", start_date:"02-04-21", end_date: "03-04-21"}});
            return res.json({error:"error", result:"Subscription not found"});
        }
    });   

}

/*const sendMail = async (from, to, subject, text) => {
    /*let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
	    port: 465,
	    secure: true,
        service: 'gmail',
        auth: {
        type: 'OAuth2',
        user:  config.allconfig.secrets.MAIL_USERNAME, //process.env.MAIL_USERNAME,
        pass:  config.allconfig.secrets.MAIL_PASSWORD,//process.env.MAIL_PASSWORD,
        clientId: config.allconfig.secrets.OAUTH_CLIENTID,
        clientSecret: config.allconfig.secrets.OAUTH_CLIENT_SECRET_ID,
        refreshToken: config.allconfig.secrets.OAUTH_REFRESH_TOKEN,
        accessToken: config.allconfig.secrets.ACCESS_TOKEN 
        }

    });*/

  /*  const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
              user: config.allconfig.secrets.MAIL_USERNAME,
              pass: config.allconfig.secrets.MAIL_PASSWORD
            }
    });
      
    let mailOptions = {
        from: from,
        to: to,
        subject: subject,
        html: text //"<a href='https://google.com/me'>reset</a>" //"<a href='http://localhost:900'>Google</a>"
      };
       
      await transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
          console.log("Error " + err);
          result = {error:"error", result:err}
        }else{
          console.log("Email sent successfully");
            result = {error:"", result:"Email sent successfully"};
            //console.log(result);
        }
       
      })

      return await result;
      
}*/


const sendMail = (from, to, subject, text) => {
    /*let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
      port: 465,
      secure: true,
        service: 'gmail',
        auth: {
        type: 'OAuth2',
        user:  config.allconfig.secrets.MAIL_USERNAME, //process.env.MAIL_USERNAME,
        pass:  config.allconfig.secrets.MAIL_PASSWORD,//process.env.MAIL_PASSWORD,
        clientId: config.allconfig.secrets.OAUTH_CLIENTID,
        clientSecret: config.allconfig.secrets.OAUTH_CLIENT_SECRET_ID,
        refreshToken: config.allconfig.secrets.OAUTH_REFRESH_TOKEN,
        accessToken: config.allconfig.secrets.ACCESS_TOKEN 
        }
  
    });*/
  
    /*const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
            user: config.allconfig.secrets.MAIL_USERNAME,
            pass: config.allconfig.secrets.MAIL_PASSWORD
          }
    });
  
    const email = new Email({
      transport: transporter,
      send: true,
      preview: false,
    });
  
    email.send({
      template: 'newaccount',
      message: {
        from: from,
        to: to,
      },
      locals: {
        fname: 'John',
        lname: 'Snow',
      }
    }).then(() => console.log('email has been sent!')
  
    ).catch(err => {
      console.log(err);
    })*/
  
    const mailgunAuth = {
        auth: {
          api_key: "bc646fd297950c4ad7f3f675fb572d4a-ba042922-a077b7f7",
          domain: "sandboxe754e91ddb48409fb0f6afcb628a9bc8.mailgun.org"
        }
    }

    const transporter = nodemailer.createTransport(mg(mailgunAuth))
  
    /*const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
              user: config.allconfig.secrets.MAIL_USERNAME,
              pass: config.allconfig.secrets.MAIL_PASSWORD
            }
    });*/
      
    let mailOptions = {
        from: "postmaster@sandboxe754e91ddb48409fb0f6afcb628a9bc8.mailgun.org",
        to: to,
        subject: subject,
        html: text //"<a href='https://google.com/me'>reset</a>" //"<a href='http://localhost:900'>Google</a>"
      };
      transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
          console.log("Error " + err);
        } else {
          console.log("Email sent successfully");
        }
      }); 
  }
  
const sendMail2 = (from, to, subject, txt) => {
    //const DOMAIN = 'sandboxe754e91ddb48409fb0f6afcb628a9bc8.mailgun.org';
    //const mailgun_api_key = 'bc646fd297950c4ad7f3f675fb572d4a-ba042922-a077b7f7';
    const DOMAIN = 'mg.Cryptolits.org';
    const mailgun_api_key = 'a43736391872e6feb838560a0cf8a148-162d1f80-6f2b888c';
    const mg = mailgun({apiKey: mailgun_api_key, domain: DOMAIN});
    const data = {
        from: from,
        to: to,
        subject: subject,
        html: txt
    };
    mg.messages().send(data, function (error, body) {
        console.log(body);
    }); 
}

const encrypt = (txt) => {
    const token = jwt.sign({text: txt}, config.allconfig.temp_var.token_secret, {expiresIn: '3600s'});    
    return token;
} 


const config = require("../../config");
const Payment = require('../../models/payment');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { getSubscriptionDetails, getAPIURL, getSiteURL, flutterwaveSecKey, getAppURL } = require("../../servicees/general");
const dayjs = require("dayjs");

exports.setPayment = (req, res) => {
    const details = {
        transaction_id: req.body.transaction_id,
        type: req.body.type,
        program_id: req.body.program_id,
        amount: req.body.amount,
       createdAt: Date.now
    }
    
    const payment = new Payment({
       details: details
    })
    payment.save()
    .then( result => {
        //console.log("USER ID: " + result._id);
        return res.json({error: "", result: "A new payment created successfully", })
    })
    .catch(err => {
        console.log("Error: ", err);
        res.json({error: "erorr", result: err, })
    })

}

exports.getAllPayments = (req, res) => {
        
    Payment.find({}, (err, result) => {
        if(err){
            console.log("Error: ", err);
            return res.json({error:"error", result:"something went wrong"});
        }
        if(result){
            var computedResult = computeStats(result)
            return res.json({error:"", result: computedResult});
        }else{
            return res.json({error:"error", result:"You have no payments. Create one"});
        }
    });   

}

exports.getAllTickets = (req, res) => {
        
    Payment.find({user_id: req.query.user_id}, (err, result) => {
        if(err){
            console.log("Error: ", err);
            return res.json({error:"error", result:"something went wrong"});
        }
        if(result){
            return res.json({error:"", result: result});
        }else{
            return res.json({error:"error", result:"You have no tickets. Create one"});
        }
    });   

}

exports.getStatsTickets = (req, res) => {
        
    Payment.find({}, (err, result) => {
        if(err){
            console.log("Error: ", err);
            return res.json({error:"error", result:"something went wrong"});
        }
        if(result){
            return res.json({error:"", result: result});
        }else{
            return res.json({error:"error", result:"You have no tickets. Create one"});
        }
    }).limit(req.body.limit).skip(req.body.skip);   
}

exports.getAllStatsTickets = (req, res) => {
        
    Payment.find({}, (err, result) => {
        if(err){
            console.log("Error: ", err);
            return res.json({error:"error", result:"something went wrong"});
        }
        if(result){
            return res.json({error:"", result: result});
        }else{
            return res.json({error:"error", result:"You have no tickets. Create one"});
        }
    })   
}


exports.getPayment = (req, res) => {
        
    Payment.find({type : req.query.type}, (err, result) => {
        if(err){
            console.log("Error: ", err);
            return res.json({error:"error", result:"something went wrong"});
        }
        if(result){
            var computedResult = computeStats(result)
            return res.json({error:"", result: computedResult});
        }else{
            return res.json({error:"error", result:"You have no payments. Create one"});
        }
    });   

}

exports.getPaymentByDate = (req, res) => {
     console.log("Day: " + dayjs().startOf(req.query.date_type) +  " End: " + dayjs().endOf(req.query.date_type))   
    Payment.find({type : req.query.type, createdAt: {$gte:  dayjs().startOf(req.query.date_type), $lte: dayjs().endOf(req.query.date_type)}}, (err, result) => {
        if(err){
            console.log("Error: ", err);
            return res.json({error:"error", result:"something went wrong"});
        }
        if(result){
            var computedResult = computeStats(result)
            return res.json({error:"", result: computedResult});
        }else{
            return res.json({error:"error", result:"You have no payments. Create one"});
        }
    });   

}


exports.pay = async (req, res) => {
    var payment_info = await pay(req.body.email, req.body.amount, req.body.user_id, req.body.type)
    return res.json(payment_info);
  
};

exports.verifyPayment = (req, res) => {
    axios({    
        method: 'GET',
        url: "https://api.flutterwave.com/v3/transactions/" + req.query.transaction_id + "/verify",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + flutterwaveSecKey()
        }
        
    })
    .then( axios_res => {
        console.log(axios_res.data.data);
        //return res.json({result: axios_res.data.data});
        var transaction_id = axios_res.data.data.tx_ref;
        var user_id = axios_res.data.data.meta.user_id;
        var ticket_id = axios_res.data.data.customer.id;
        var amount = axios_res.data.data.charged_amount;
        var type = axios_res.data.data.meta.type;
        var status = 1;
        const payment = new Payment({
            type: type,
            transaction_id: transaction_id,
            ticket_id: ticket_id,
            user_id: user_id,
            amount: amount,
            status: status
        })

        payment.save()
        .then(sub_result => {
            console.log(sub_result);
            res.redirect(`${getAppURL()}/payment/success`)
            //res.json({error:"", result:"Payment verified"});
        })
        .catch(sub_err => {
            console.log(sub_err);
            res.json({error:"error", result:"Something went wrong 1"});
        })
        
       /* if(axios_res.data.status == "success" && axios_res.data.data.currency == "USD"){
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
                const payment = new Payment({
                    type: type,
                    transaction_id: "jsjjsjs",
                    user_id: user_id,

                    status: 1,
                    end_date: end_date,
                })

                payment.save()
                .then(sub_result => {
                    console.log(sub_result);
                    res.redirect(`http://localhost:3000/dashboard`)
                    //res.json({error:"", result:"Payment verified"});
                })
                .catch(sub_err => {
                    console.log(sub_err);
                    res.json({error:"error", result:"Something went wrong 1"});
                })
            }else{
                
                res.json({error:"error", result:"Something went wrong 2"});
            }

        }*/
    })
    .catch( err => {
        console.log(err);
        res.json({error: "error", result: "Something went wrong 3"});
    })

}



const pay = async (email, amount, user_id, type) => {
    const tx_ref = uuidv4();
    const redirect_url = `${getAPIURL()}/v1/verifypayment`
    //add payment plan
    //console.log(redirect_url);
    let response = {};
    const onetime_payment = {
        "tx_ref": tx_ref,
        "currency":"NGN",
        "amount": amount,
        "redirect_url":redirect_url,
        "payment_options":"card",
        "customer":{
           "email":email,
        },
        meta:{
            user_id: user_id,
            type: type,

        },
        "customizations":{
           "title":"Healaworld",
           "description":"A funding platform"
        }
     }

     await axios({
        method: "POST",
        url: "https://api.flutterwave.com/v3/payments",
        data: onetime_payment,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + flutterwaveSecKey()
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

const computeStats = (data) => {
    var amount = 0;
    var tickets = data.length;
    for(var i=0; i<data.length; i++){
        amount += parseInt(data[i].amount);
    }
    return {tickets: tickets, amount: amount}
}


// Onetime payment
// Payout to winner
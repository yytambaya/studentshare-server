var config = require('../config')
const mailgun = require("mailgun-js");

exports.getSubscriptionDetails = () => {
    const paymentDetails = config.allconfig.App.ENV == "DEV" ? config.allconfig.Payment : config.allconfig.realPayment;
    return paymentDetails;
}

exports.getAppURL = () => {
    const appDetails = config.allconfig.App.ENV == "DEV" ? config.allconfig.App.DEV_SITE_URL : config.allconfig.App.PROD_APP_URL;
    return appDetails;
}

exports.getSiteURL = () => {
    const siteDetails = config.allconfig.App.ENV == "DEV" ? config.allconfig.App.DEV_SITE_URL : config.allconfig.App.PROD_SITE_URL;
    return siteDetails;
}

exports.getAPIURL = () => {
    const apiDetails = config.allconfig.App.ENV == "DEV" ? config.allconfig.App.DEV_API_URL : config.allconfig.App.PROD_API_URL;
    return apiDetails;
}
exports.flutterwaveSecKey = () => {
    const apiDetails = config.allconfig.App.ENV == "DEV" ? config.allconfig.Payment.FLUTTER_SEC_KEY : config.allconfig.Payment.FLUTTER_PROD_SEC_KEY;
    return apiDetails;
}
exports.flutterwavePubKey = () => {
    const apiDetails = config.allconfig.App.ENV == "DEV" ? config.allconfig.Payment.FLUTTER_PUBLIC_KEY : config.allconfig.Payment.FLUTTER_PROD_PUBLIC_KEY;
    return apiDetails;
}

exports.sendMail = (from, to, subject, txt) => {
    //const DOMAIN = 'sandboxe754e91ddb48409fb0f6afcb628a9bc8.mailgun.org';
    //const mailgun_api_key = 'bc646fd297950c4ad7f3f675fb572d4a-ba042922-a077b7f7';
    const DOMAIN = 'mg.healaworld.org';
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
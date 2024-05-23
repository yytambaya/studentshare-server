const nodemailer = require('nodemailer');
const mg = require("nodemailer-mailgun-transport")
const mailgun = require("mailgun-js");

const sendMail2 = (from, to, subject, txt) => {
  const DOMAIN = 'sandboxe754e91ddb48409fb0f6afcb628a9bc8.mailgun.org';
  const mailgun_api_key = 'bc646fd297950c4ad7f3f675fb572d4a-ba042922-a077b7f7';
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


module.exports = {
  sendMail2: sendMail2
}
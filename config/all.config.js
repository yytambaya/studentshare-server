const dotenv = require('dotenv');
dotenv.config()

process.env['DB_URL']='mongodb://0.0.0.0:27017/share';

module.exports = {
    App:{
        ENV: process.env.NODE_ENV,
        DEV_DB_URL: 'mongodb://0.0.0.0:27017/share',
        PROD_DB_URL: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.mrrhl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
        DEV_API_URL: 'http://localhost:5000',
        PROD_API_URL: 'https://healdaworld-admin.herokuapp.com',
        PROD_SITE_URL: 'http://healaworld.org',
        PROD_APP_URL: 'http://dashboard.healaworld.org',
        DEV_SITE_URL: 'http://localhost:3000'
        //mongodb+srv://healaworld:<password>@cluster0.omgwy.mongodb.net/?retryWrites=true&w=majority
    },
    service: {
        OPEN_AI_API_KEY: process.env.OPEN_AI_API_KEY,
        AWS_ACCESS_KEY_ID: process.env.ACCESS_KEY_ID,
        AWS_SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
        CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
        CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
        CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
        GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL,
        GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET
      },
    Payment:{
        username: "",
        password: "",
        FLUTTER_SEC_KEY: process.env.FLUTTER_SEC_KEY,
        FLUTTER_PUBLIC_KEY: process.env.FLUTTER_PUBLIC_KEY,
        FLUTTER_PROD_SEC_KEY: process.env.FLUTTER_PROD_SEC_KEY,
        FLUTTER_PROD_PUBLIC_KEY: process.env.FLUTTER_PROD_PUBLIC_KEY,
        once_amount: 89,
        monthly_amount: 1.00,
        yearly_amount: 10,
        onetime_plan_id: 18661,
        monthly_plan_id: 18660, 
        yearly_plan_id: 18659,
    },
    temp_var:{
        token_secret: "wshsghs763ghsebhs",
        id: ""
    },
    secrets:{
        MAIL_USERNAME1: process.env.MAIL_USERNAME1,
        MAIL_USERNAME: process.env.MAIL_USERNAME,
        MAIL_PASSWORD: process.env.MAIL_PASSWORD,
        OAUTH_CLIENTID: process.env.OAUTH_CLIENTID,
        OAUTH_CLIENT_SECRET_ID: process.env.OAUTH_CLIENT_SECRET_ID,
        OAUTH_REFRESH_TOKEN: process.env.OAUTH_REFRESH_TOKEN, 
        ACCESS_TOKEN: process.env.ACCESS_TOKEN
    }
}
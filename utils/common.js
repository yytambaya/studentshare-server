
const dotenv = require('dotenv')
const config = require('../config')
const NodeCache = require('node-cache')
//logger = require('.///logger')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const path = require('path')
const allConfig = require('../config/all.config')

const myCache = new NodeCache()
dotenv.config()

exports.getAPIBaseURL = () => {
  const apiBaseURL = allConfig.app.ENV === 'DEV' ? allConfig.App.DEV_API_URL : allConfig.app.PROD_API_URL
  return apiBaseURL
}
exports.getSiteBaseURL = () => {
  console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
  const siteBaseURL = allConfig.app.ENV === 'DEV' ? allConfig.App.DEV_SITE_URL : allConfig.app.PROD_SITE_URL
  return siteBaseURL
}

exports.hasAccess = () => {
  // const result = allConfig.app.ENV === 'DEV' ? true : allConfig.app.PROD_API_URL === 'http://ijmb-datacenter.ng'
  // return result
}

exports.getDBURL = () => {
  const dbURL = allConfig.app.ENV === 'DEV' ? allConfig.DB.DEV_DB_URL : allConfig.DB.PROD_DB_URL
  return dbURL
}

exports.getRedisHost = () => {
  const redisHost = allConfig.app.ENV === 'DEV' ? allConfig.redis.DEV_HOST : allConfig.redis.PROD_HOST
  return redisHost
}

exports.getRedisPort = () => {
  const redisPort = allConfig.app.ENV === 'DEV' ? allConfig.redis.DEV_PORT : allConfig.redis.PROD_PORT
  return redisPort
}

exports.getRedisPassword = () => {
  const redisPassword = allConfig.app.ENV === 'DEV' ? allConfig.redis.DEV_PASSWORD : allConfig.redis.PROD_PASSWORD
  return redisPassword
}

exports.getGoogleServiceAccountClientEmail = () => {
  const result = allConfig.app.ENV === 'DEV' ? allConfig.service.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL : allConfig.service.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL
  return result
}

exports.getGoogleServiceAccountPrivateKey = () => {
  const result = allConfig.app.ENV === 'DEV' ? allConfig.service.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY : allConfig.service.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
  return result
}

exports.getGoogleClientId = () => {
  const result = allConfig.app.ENV === 'DEV' ? allConfig.service.GOOGLE_CLIENT_ID : allConfig.service.GOOGLE_CLIENT_ID
  return result
}

exports.getGoogleClientSecret = () => {
  const result = allConfig.app.ENV === 'DEV' ? allConfig.service.GOOGLE_CLIENT_SECRET : allConfig.service.GOOGLE_CLIENT_SECRET
  return result
}

exports.getLogFile = async () => {
  const logFile = allConfig.app.ENV === 'DEV' ? allConfig.files.DEV_FILE_PATH : allConfig.files.PROD_FILE_PATH
  console.log(logFile)
  return logFile
}

exports.addToMemory = (key, value) => {
  myCache.set(key, value)
}
exports.getFromMemory = (key) => {
  const value = myCache.get(key)
  return value
}

exports.successFunction = (code, error) => {
  //logger.info(error)
  return { status: 'error', code, message: error }
}

exports.warnFunction = (code, error) => {
  //logger.warn(error)
}

exports.errorFunction = (thisCode, error) => {
  //logger.error(error)
  return { status: 'error', code: thisCode, message: error }
}

exports.generateAuthToken = (payload) => {
  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET, { algorithm: 'HS256', expiresIn: '1d' })
    return { status: 200, message: 'successful', data: token }
  } catch (error) {
    return { status: 500, message: 'error', data: error }
  }
}

exports.verifyAuthToken = (token) => {
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET)
    return { status: 200, message: 'successful', data }
  } catch (error) {
    return { status: 500, message: 'error', data: error }
  }
}

exports.hashPassword = async (plainPassword) => {
  const saltRounds = 10
  const result = await bcrypt.hash(plainPassword, saltRounds)
  return result
}

exports.isThesamePassword = async (dbPassword, plainPassword) => {
  const result = await bcrypt.compare(plainPassword, dbPassword)
  return result
}

exports.generateResetToken = () => {
  const token = uuid()
  return token
}

exports.generatePasswordResetLink = (ownerId, token) => {
  const link = `${this.getAPIBaseURL()}/admin/password-reset/${ownerId}/${token}`
  return link
}

exports.generateOTP = () => {
  const otp = Math.random(0, 9) * 9
  return otp
}

exports.convertToFourDigits = (number) => {
  let fourDigitsNumber = ''
  if (number.length === 1) {
    fourDigitsNumber = '000' + number
  } else if (number.length === 2) {
    fourDigitsNumber = '00' + number
  } else if (number.length === 3) {
    fourDigitsNumber = '0' + number
  } else if (number.length === 4) {
    fourDigitsNumber = number
  } else {
    fourDigitsNumber = number
  }
  return fourDigitsNumber
}

exports.convertToSixDigits = (number) => {
  let sixDigitsNumber = ''
  if (number.length === 1) {
    sixDigitsNumber = '00000' + number
  } else if (number.length === 2) {
    sixDigitsNumber = '0000' + number
  } else if (number.length === 3) {
    sixDigitsNumber = '000' + number
  } else if (number.length === 4) {
    sixDigitsNumber = '00' + number
  } else if (number.length === 5) {
    sixDigitsNumber = '0' + number
  } else if (number.length === 6) {
    sixDigitsNumber = number
  } else {
    sixDigitsNumber = number
  }
  return sixDigitsNumber
}

exports.convertBase64ToImage = (base64) => {
  // const base64 = fs.readFileSync("path-to-image.jpg", "base64");
  // C onvert base64 to buffer => <Buffer ff d8 ff db 00 43 00 ...
  const buffer = Buffer.from(base64, 'base64')
  return buffer
}

exports.sanitizeFile = (file, cb) => {
  // Define the allowed extension
  const fileExts = ['.png', '.jpg', '.jpeg']

  // Check allowed extensions
  const isAllowedExt = fileExts.includes(
    path.extname(file.originalname.toLowerCase())
  )

  // Mime type must be an image
  const isAllowedMimeType = file.mimetype.startsWith('image/')

  if (isAllowedExt && isAllowedMimeType) {
    return cb(null, true) // no errors
  } else {
    // eslint-disable-next-line n/no-callback-literal
    cb('Error: File type not allowed!')
  }
}

const multer = require('multer')
const { google } = require('googleapis')
const path = require('path')
const createReadStream = require('fs').createReadStream
//const process = require('process')
const cloudinary = require('cloudinary').v2
const { addToMemory } = require('../utils/common')
const { multerFilter } = require('../routers/all.router')
//const { authorizeGoogleAccess } = require('../services/google.service')
const { generateRandomNumber } = require('../controllers/share.controller')
const allConfig = require('../config/all.config')
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const moduleName = 'Middleware > Upload'

cloudinary.config({
  cloud_name: allConfig.service.CLOUDINARY_CLOUD_NAME,
  api_key: allConfig.service.CLOUDINARY_API_KEY,
  api_secret: allConfig.service.CLOUDINARY_API_SECRET
})

const cloundinaryStorage = new CloudinaryStorage({
  cloudinary,
  params: this.uploadImageToCloudinary
})

exports.generateFileName = async (req, file, cb) => {
  let fileName = new Date().toDateString()
  const studentGenerationResult = await generateRandomNumber()
  if (studentGenerationResult.status === 200) {
    fileName = `${studentGenerationResult.data}.png`
    console.log('Student Number from Multer: ' + studentGenerationResult.data)
    addToMemory('randomNumber', studentGenerationResult.data)
  }
  cb(null, fileName)
}

exports.uploadImageToCloudinary = async (req, res) => {
  const fileName = req.body?.centerNumber || 1234
  const folderName = await this.generateFileNameForCloudinary(req)
  const folderExistsResult = await folderExists(folderName)
  if (folderExistsResult.status === 200) {
    if (folderExistsResult.data.doesFolderExists) {
      const uploadImageResult = await uploadImage(folderName, fileName)
      if (uploadImageResult.status === 200) {
        return res.json({ status: 200, message: 'successful', data: null })
      } else {
        return res.json({ status: 500, message: 'error with uploadImage', data: null })
      }
    } else {
      const folderCreationResult = await createFolder(folderName)
      if (folderCreationResult.status === 200) {
        const uploadResult = await uploadImage(folderName, fileName)
        if (uploadResult.status === 200) {
          return res.json({ status: 200, message: 'successful', data: null })
        } else {
          return res.json({ status: 500, message: 'error with uploadImage', data: null })
        }
      } else {
        return res.json({ status: 500, message: 'error with folderCreation', data: null })
      }
    }
  } else {
    return res.json({ status: 500, message: 'error with folderExists', data: null })
  }
}

exports.generateFileNameForCloudinary = async (req) => {
  let fileName = new Date().toDateString()
  // const studentGenerationResult = await generateStudentNumber(req.body?.centerNumber)
  const studentGenerationResult = await generateRandomNumber(1234)
  if (studentGenerationResult.status === 200) {
    fileName = `${studentGenerationResult.data}`
    console.log('Student Number from Multer: ' + studentGenerationResult.data)
    addToMemory('randomNumber', studentGenerationResult.data)
  }
  console.log('fileName: ', fileName)
  return fileName
}

const createFolder = async (folderNme) => {
  try {
    const result = await cloudinary.api.create_folder(folderNme)
    console.log('Folder created successfully')
    return { status: 200, message: 'successful', data: result }
  } catch (error) {
    console.log('Error in creating folder', error)
    //logger.error(`${moduleName} > createFolder > ${error}`)
    return { status: 500, message: 'error', data: error }
  }
}

const folderExists = async (folderName) => {
  try {
    const resources = await cloudinary.api.resources({ type: 'upload', prefix: `${folderName}/`, max_results: 1 })
    const doesFolderExists = resources.total_count > 0
    return { status: 200, message: 'successful', data: { doesFolderExists } }
  } catch (error) {
    console.log('Error in checking if folder exists ', error)
    //logger.error(`${moduleName} > folderExists > ${error}`)
    return { status: 500, message: 'error', data: null }
  }
}

const uploadImage = async (folderName, fileName) => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(fileName.toString(), { folder: folderName, public_id: fileName, resource_type: 'auto' })
    console.log('upload successful!!')
    return { status: 200, message: 'successful', data: uploadResponse }
  } catch (error) {
    console.log('Error in uploading image', error)
    //logger.error(`${moduleName} > uploadImage > ${error}`)
    return { status: 500, message: 'error', data: null }
  }
}

exports.uploadFileToGoogleDrive = async (authClient) => {
  const drive = google.drive({ version: 'v3', auth: authClient })

  const file = await drive.files.create({
    media: {
      body: createReadStream('photo')
    },
    fields: 'id',
    requestBody: {
      name: path.basename('filename')
    }
  })
  console.log(file.data.id)
}

/* exports.download = async () => {
  var fileId = '0BwwA4oUTeiV1UVNwOHItT0xfa2M';
  var dest = fs.createWriteStream('/tmp/photo.jpg');
  drive.files.get({
    fileId: fileId,
    alt: 'media'
  })
      .on('end', function () {
        console.log('Done');
      })
      .on('error', function (err) {
        console.log('Error during download', err);
      })
      .pipe(dest)
} */

exports.deleteFileFromGoogleDrive = async () => {
  try {
    const response = await google.drive.files.delete({
      fileId: 'File_id'// file id
    })
    console.log(response.data, response.status)
  } catch (error) {
    console.log(error.message)
  }
}

exports.runGoogleDriveUpload = async (req, res) => {
  //authorizeGoogleAccess().then(this.uploadFileToGoogleDrive).catch(console.error)
  /* try {
    const auth = await authorizeGoogleAccess()
    const result = await this.uploadFileToGoogleDrive(auth)
    console.log(result)
    res.json({ result })
  } catch (error) {
    console.log(error)
    res.json({ error })
  } */
}

exports.multerFilter = (req, file, cb) => {
  if (file.mimetype.split('/')[1] === 'jpg' || file.mimetype.split('/')[1] === 'jpeg' || file.mimetype.split('/')[1] === 'png' || file.mimetype.split('/')[1] === 'mp4' || file.mimetype.split('/')[1] === 'pdf' || file.mimetype.split('/')[1] === 'docx' || file.mimetype.split('/')[1] === 'txt') {
    cb(null, true)
  } else {
    console.log('Must be an image of jpg, jpeg or png')
    cb(new Error('Must be an image of jpg, jpeg or png'), false)
  }
}

exports.CloundinaryImageUpload = multer({
  storage: cloundinaryStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 100 * 1024 * 1024 } // 1mb file size
})

const memoryStorage = new multer.memoryStorage()
exports.EmptyImageUpload = multer({
  storage: memoryStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 100 * 1024 * 1024 }
})

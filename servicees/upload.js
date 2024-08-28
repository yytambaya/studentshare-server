const multer = require('multer')
// const multerS3 = require('multer-s3')
const cloudinary = require('cloudinary').v2
// const { S3Client } = require('@aws-sdk/client-s3')
const { addToMemory } = require('../utils/common')
// const { allConfigs } = require('../config')
// const { generateStudentNumber } = require('../controllers/student.controller')
const { multerFilter } = require('../routers/all.router')
//logger = require('../utils///logger')
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const { generateRandomNumber } = require('../controllers/share.controller')
const moduleName = 'Middleware > Upload'
const CLOUDINARY_IJMB_FOLDER_NAME = 'IJMB'
const path = require('path')

exports.uploadImageToCloudinary = async (req, res, next) => {
   if(!req.file){
     next()
   }else{ 
    console.log('Re:::: ', req.body)
    try {
        const parentFolder = 'students'
        let fileName = null
        // const folderName = req.body?.centerNumber || 1236
        const folderName = 'share'
        fileName = await this.generateFileNameForCloudinary(req)
        const folderPath = `${CLOUDINARY_IJMB_FOLDER_NAME}/${folderName}`
        const folderCreationPath = `${CLOUDINARY_IJMB_FOLDER_NAME}/${parentFolder}/${folderName}`
        console.log("Path: " + folderCreationPath)
        const extension = path.extname(req.file.originalname);
        fileName //+= extension
        const b64 = Buffer.from(req.file.buffer).toString('base64')
        const dataURI = 'data:' + req.file.mimetype + ';base64,' + b64
        console.log('My File Name: ', fileName)
        //console.log('My datURI: ' + dataURI)
        const folderExistsResult = await folderExists(parentFolder, folderName)
        if (folderExistsResult.status === 200 || folderExistsResult.status == 404) {
        const uploadImageResult = await uploadImage(folderCreationPath, fileName, dataURI)
        if (uploadImageResult.status === 200) {
            // return res.json({ status: 200, message: 'successful', data: null })
            next()
        } else {
            return res.status(500).json({ status: 500, message: 'error with uploadImage', data: null })
        }
        // res.json({ result: 'Folder exists!' })
        } else {
        const folderCreationResult = await createFolder(folderCreationPath)
        if (folderCreationResult.status === 200) {
            const uploadResult = await uploadImage(folderCreationPath, fileName, dataURI)
            if (uploadResult.status === 200) {
            // return res.json({ status: 200, message: 'successful', data: null })
            next()
            } else {
            return res.status(500).json({ message: 'error with uploadImage', data: null })
            }
            // res.json({ result: 'Folder does not exists!' })
        } else {
            return res.status(500).json({ message: 'error with folder creation', data: null })
        }
        }
        /* else {
        return res.json({ status: 500, message: 'error with folderExists', data: null })
        } */
    } catch (error) {
        console.log('Error with the whole upload runner', error)
        return res.status(500).json({ message: 'something went wrong with upload runner', data: null })
    }
    }
}

exports.generateFileNameForCloudinary = async (req) => {
  let fileName = new Date().toDateString()
  const studentGenerationResult = await generateRandomNumber()
  // const studentGenerationResult = await generateStudentNumber(1234)
  if (studentGenerationResult.status === 200) {
    fileName = `${studentGenerationResult.data}`
    console.log('Student Number from Multer: ' + studentGenerationResult.data)
    addToMemory('randomNumber', studentGenerationResult.data)
  }
  console.log('fileName: ', fileName)
  return fileName
}

const createFolder = async (folderPath) => {
  console.log('Folder Creation')
  try {
    const result = await cloudinary.api.create_folder(folderPath)
    console.log('Folder created successfully', result)
    return { status: 200, message: 'successful', data: result }
  } catch (error) {
    console.log('Error in creating folder', error)
    //logger.error(`${moduleName} > createFolder > ${error}`)
    return { status: 500, message: 'error', data: error }
  }
}

const folderExists = async (parentFolder, folderName) => {
  try {
    // Use the 'sub_folders' resource of the Cloudinary Admin API to get the list of subfolders in a parent folder
    const response = await cloudinary.api.sub_folders(parentFolder, { type: 'upload' })
    // console.log(response)
    const subfolders = response.folders
    // Check if the desired folder exists in the list of subfolders
    const folderExists = subfolders.some(folder => folder.name === folderName)
    // console.log('folderExists: ', folderExists)
    return { status: 500, message: 'error', data: { folderExists } }
  } catch (error) {
    console.log('Error in checking if folder exists ', JSON.stringify(error))
    //logger.error(`${moduleName} > folderExists > ${error}`)
    if (error?.error?.http_code == 404) {
      return { status: 404, message: 'error', data: null }
    } else {
      return { status: 500, message: 'error', data: null }
    }
  }
}

const uploadImage = async (folderName, fileName, filePath) => {
  try {
    //console.log('File path: ', filePath)
    const uploadResponse = await cloudinary.uploader.upload(filePath, { folder: folderName, resource_type: 'auto', public_id:  fileName})
    console.log('upload successful!!')
    return { status: 200, message: 'successful', data: uploadResponse }
  } catch (error) {
    console.log('Error in uploading image', JSON.stringify(error))
    //logger.error(`${moduleName} > uploadImage > ${error}`)
    return { status: 500, message: 'error', data: null }
  }
}

exports.deleteImageAndUploadIfExists = async (req, res, next) => {
  try {
    console.log('Delete and upload')
    const photo = req.file
    console.log('photo hhh: ', photo)
    const parentFolder = 'students'
    const imagePath = `${CLOUDINARY_IJMB_FOLDER_NAME}/${parentFolder}/${req.body.centerNumber}/${req.body.studentNumber}`
    console.log(imagePath)
    if (photo) {
      // await cloudinary.api.delete_resources(imagePath)
      await cloudinary.uploader.destroy(imagePath, { invalidate: true })
      console.log('Photo is sent')
      await this.uploadImageToCloudinary(req, res, next)
      // console.log('Image deleted successfully: ' + JSON.stringify(deleteResponse))
      // next()
    } else {
      console.log('Photo not sent')
      next()
    }
  } catch (error) {
    console.log('Error in deleteImage: ', error)
    //logger.error(`${moduleName} > deleteImage > ${error}`)
    return res.status(500).json({ message: 'something went wrong', data: null })
  }
}

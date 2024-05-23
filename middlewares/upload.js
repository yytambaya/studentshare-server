const multer = require("multer")
const path = require("path")

var uploadLogo = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/logo')
        },
        filename: (req, res, (cb) => {
            cb(null, Date.now() + path.extname(file.originalname)) // return a unique file name for every file              
        })
    }),

    limits: {fileSize: 20000000},   // This limits file size to 2 million bytes(2mb)

    fileFilter: (req, file, cb) => {
        const validFileTypes = /jpg|jpeg|png/ // Create regex to match jpg and png

        // Do the regex match to check if file extenxion match
        const extname = validFileTypes.test(path.extname(file.originalname).toLowerCase())

        if(extname === true){
            // Return true and file is saved
             return cb(null, true)
        }else{
            // Return error message if file extension does not match
            return cb("Error: Images Only!")
            }
        }
}).single("logo")

modules.exports = {
    uploadLogo 
}
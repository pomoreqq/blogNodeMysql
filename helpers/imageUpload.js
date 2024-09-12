
const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null, './images')
    },
    filename: function(req,file,cb) {
        cb(null,new Date().getTime() + path.extname(file.originalname))
    }
})


const fileFilter = (req,file,cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(new Error('Wrong type of uploaded image'),false)
    }
}


const uploadFile = multer({
    storage: storage,
    limits: {
        fileSize: 1024*1024*10
    },
    fileFilter: fileFilter
})



module.exports = {
    uploadFile: uploadFile
}
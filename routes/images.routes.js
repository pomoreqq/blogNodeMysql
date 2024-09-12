const express = require('express')

const imageController = require('../controllers/image.controller')

const imageUploader = require('../helpers/imageUpload')


const auth = require('../middleware/auth')


const router = express.Router()


router.post('/upload', auth, imageUploader.uploadFile.single('image'), imageController.uploadImage)



module.exports = router
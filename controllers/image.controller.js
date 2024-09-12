function uploadImage(req,res) {
    if(req.file.filename){
        res.status(201).json({
            message: 'upload successfuly',
            url: req.file.filename
        })
    } else {
        res.status(500).json({
            message: "upload went wrong"
        })
    }
}



module.exports = {
    uploadImage:uploadImage
}
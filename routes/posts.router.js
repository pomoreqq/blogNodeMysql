const express = require('express')
const postController = require('../controllers/post.controller')


const router = express.Router()

router.post('/',postController.savePost);

router.get('/:id', postController.showPost)


router.get('/',postController.allPosts)


router.patch('/:id',postController.updatePost)


router.delete('/:id',postController.deletePost)
module.exports = router
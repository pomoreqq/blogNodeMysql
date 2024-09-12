const express = require('express')
const postController = require('../controllers/post.controller')


const checkAuthMiddleware = require('../middleware/auth')

const router = express.Router()

router.post('/',checkAuthMiddleware,postController.savePost);

router.get('/:id', postController.showPost)


router.get('/',postController.allPosts)


router.patch('/:id',checkAuthMiddleware,postController.updatePost)


router.delete('/:id',checkAuthMiddleware,postController.deletePost)

module.exports = router
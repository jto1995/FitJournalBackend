const router = require('express').Router()
const postController = require('../controllers/postController')
const middleware = require('../middleware/middleware')
router
    .route('/')
    .get(postController.getPosts)
    .post(middleware.checkToken, postController.newPost)
    
router
    .route('/:id')
    .get(postController.displayUserPosts)
    .delete(postController.deletePost)

module.exports = router
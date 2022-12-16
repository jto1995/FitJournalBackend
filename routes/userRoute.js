const router = require('express').Router();

const userController = require('../controllers/userController')
const middleware = require('../middleware/middleware')

router
    .route("/")
    .post(userController.newUserInfo)
    .get(middleware.checkToken, userController.getUserInfo)
    .delete(userController.deleteUserInfo)
    
router
    .route("/:id")
    .get(userController.getUsersProfile)
    
router
    .route("/login")
    .post(userController.loginUser)
    
    module.exports = router;

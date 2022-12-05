const router = require('express').Router();

const userController = require('../controllers/userController')


router
    .route("/")
    .post(userController.newUserInfo)
    .get(userController.getUserInfo)

router
    .route("/:id")
    // .put(userController.editUserInfo)
    .delete(userController.deleteUserInfo)
    
router
    .route("/login")
    .post(userController.loginUser)
    
    router
    .route('/weight')
    .post(userController.checkToken, userController.newWeight)
    .get(userController.checkToken,userController.getUserWeight)

    module.exports = router;

const router = require('express').Router();

const userController = require('../controllers/userController')

router
    .route("/")
    .post(userController.newUserInfo)

router
    .route("/:id")
    .get(userController.getUserInfo)
    .put(userController.editUserInfo)
    .delete(userController.deleteUserInfo)
const fs = require('fs');
const express = require('express');
const router = express.Router();
const weightController = require("../controllers/weightController")
const middleware = require('../middleware/middleware')
router
    .route('/')
    .get(middleware.checkToken, weightController.getUserWeight)
    .post(middleware.checkToken, weightController.newWeight)
    // .delete(weightController.deleteUserWeight)
    // .put(weightController.editUserWeight)


    
module.exports = router;
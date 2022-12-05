const fs = require('fs');
const express = require('express');
const router = express.Router();
const weightController = require("../controllers/weightController")

router
    .route('/:id')
    // .get(weightController.getUserWeight)
    // .post(weightController.newWeight)
    .delete(weightController.deleteUserWeight)
    .put(weightController.editUserWeight)
    
module.exports = router;
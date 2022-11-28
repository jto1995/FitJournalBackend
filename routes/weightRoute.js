const fs = require('fs');
const express = require('express');
const router = express.Router();
const weightController = require("../controllers/weightController")

router
    .route('/:id')
    //get User Weight
    .get(weightController.getWeight)
    //post User Weight
    .post(weightController.newWeight)
    //Delete User Weight
    .delete(weightController.deleteUserWeight)
    //Update User Weight
    .put(weightController.editUserWeight)
        
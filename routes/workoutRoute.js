const router = require("express").Router();

const workoutController = require('../controllers/workoutController')
const middleware = require('../middleware/middleware')

router
    .route('/')
    .get(middleware.checkToken, workoutController.getUserWorkout)

    router
    .route('/template')
    .get(workoutController.getWorkoutTemplates)
    
    router
        .route('/template/:id')
        .get(workoutController.getSingleWorkoutTemplate)
        

module.exports = router;
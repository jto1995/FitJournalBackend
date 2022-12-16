const router = require("express").Router();

const workoutController = require('../controllers/workoutController')
const middleware = require('../middleware/middleware');

router
    .route('/')
    .get(middleware.checkToken, workoutController.getUserWorkout)
    .post(middleware.checkToken, workoutController.postNewUserWorkoutTemplate)

    router
    .route('/user/:id')
    .get(workoutController.displayUserWorkout)

    router
    .route('/template')
    .get(workoutController.getWorkoutTemplates)
    
    router
    .route('/template/:id')
    .get(workoutController.getSingleWorkoutTemplate)
        
    router
    .route('/exercise')
    .get(workoutController.getExercises)
    
    router
    .route('/log')
    .post(middleware.checkToken, workoutController.postWorkoutLog)


module.exports = router;
const knex = require("knex")(require("../knexfile"));
const { v4: uuid } = require("uuid");
const workout_exercise = require("../seed_data/workout_exercise");

exports.getWorkoutTemplates = (req, res) => {
  knex("workouts")
    .join(
      "workout_templates_exercise",
      "workouts.id",
      "workout_templates_exercise.workouts_id"
    )
    .join(
      "exercises",
      "exercises.id",
      "workout_templates_exercise.exercises_id"
    )
    .select("workouts.id", "workouts.workout_name", "exercises.name")
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => res.status(400).send("error retrieving history"));
};

exports.getSingleWorkoutTemplate = (req, res) => {
  knex
    .select(
      "workout_exercise.workouts_id",
      "workout_exercise.exercises_id",
      "exercises.name",
      "exercises.category",
      "workout_exercise.id"
    )
    .from("workouts")
    .join(
      "workout_exercise",
      "workouts.id",
      "workout_exercise.workouts_id"
    )
    .join(
      "exercises",
      "exercises.id",
      "workout_exercise.exercises_id",
    )
    .where("workouts.id", req.params.id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => res.status(400).send("error retrieving history"));
};

exports.getUserWorkout = (req, res) => {
  knex("workouts").then((data) => {
    const userWorkout = data.filter((user) => user.user_id === req.user.id);
    res.status(200).send(userWorkout);
  });
};

exports.displayUserWorkout = (req, res) => {
  knex("workouts")
    .join("workout_exercise", "workout_exercise.workouts_id", "workouts.id")
    .join("exercises", "exercises.id", "workout_exercise.exercises_id")
    .select("workout_exercise.workouts_id", "exercises.name")
    .where('workout_exercise.workouts_id', req.params.id)
    .then((data) => {
      res.status(200).send(data);
    });
};

exports.getExercises = (req, res) => {
  knex("exercises").then((data) => {
    res.status(200).send(data);
  });
};

exports.postNewUserWorkoutTemplate = (req, res) => {
  if (!req.body.workout_name) {
    res.status(400).send("Please Fill Out Fields");
  } else {
    const workId = uuid();
    knex("workouts")
      .where((user) => user.user_id === req.user.id)
      .insert({
        id: workId,
        workout_name: req.body.workout_name,
        user_id: req.user.id,
      })
      .then(() => {
        return Promise.all(
          req.body.exercises_ids.map((exerciseId) =>
            knex("workout_exercise").insert({
              id: uuid(),
              workouts_id: workId,
              exercises_id: exerciseId,
            })
          )
        );
      })
      .then((response) => {
        res.status(201).send("New Template Saved");
      })
      .catch((err) => {
      });
  }
};

exports.postWorkoutLog = (req, res) => {
  knex("workout_exercise")
    .where((user) => user.user_id === req.user.id)
    .insert({
      id: uuid(),
      workouts_id: req.body.workouts_id,
      exercises_id: req.body.exercise_id,
      sets: req.body.sets,
      reps: req.body.reps,
      weight: req.body.weight,
    })
    .then(() => {
      res.status(201).send("Log has been uploaded");
    });
};

exports.getWorkoutLog = (req,res) => {
  knex("workouts")
  .where((user) => user.user_id === req.user.id)
  .join("workout_exercise", "workout_exercise.workouts_id", "workouts.id")
  .join("exercises", "exercises.id", "workout_exercise.exercises_id")
  .select("workouts.id", "workouts.workout_name", "workout_exercise.created_at", "workout_exercise.sets", "workout_exercise.reps", "workout_exercise.weight", "exercises.names")
  .then((data) => {
    const userWorkout = data.filter((workout_exercise) => workout_exercise.sets !== null);
    res.status(200).send(userWorkout);
  })}

exports.deleteSingleExerciseFromTemplate = (req,res) => {
  knex("workout_exercise")
  .where("id" , req.params.id)
  .del()
  .then((data) => {
    res.status(200).send('exercise deleted')
  })
  
}

exports.deleteEntireWorkout = (req, res) => {
  knex("workouts")
  .where("id", req.params.id)
  .del()
  .then((data) => {
    res.status(200).send("Template Deleted")
  })
}
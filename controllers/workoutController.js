const knex = require("knex")(require("../knexfile"));
const { v4: uuid } = require("uuid");

exports.getWorkoutTemplates = (req, res) => {
  knex("workout_templates")
    .join(
      "workout_templates_exercise",
      "workout_templates.id",
      "workout_templates_exercise.workout_templates_id",
    )
    .join(
      "exercises",
      "exercises.id",
      "workout_templates_exercise.exercises_id"
    )
    .select(
      "workout_templates.id",
      "workout_templates.template_name",
      "exercises.name",
      )
    .then((data) => {
      console.log(data)
      res.status(200).send(data);
    })
    .catch((err) => res.status(400).send("error retrieving history"));
};

exports.getSingleWorkoutTemplate = (req, res) => {
  knex("workout_templates")
    .join(
      "workout_templates_exercise",
      "workout_templates.id",
      "workout_templates_exercise.workout_templates_id",
    )
    .join(
      "exercises",
      "exercises.id",
      "workout_templates_exercise.exercises_id"
    )
    .select(
      "workout_templates.id",
      "workout_templates.template_name",
      "exercises.name",
      )
    .where("workout_templates.id", req.params.id)
    .then((data) => {
      console.log(data)
      res.status(200).send(data);
    })
    .catch((err) => res.status(400).send("error retrieving history"));
};

exports.getUserWorkout = ( req, res) => {
  knex("workouts")
    .then((data) => {
      const userWorkout = data.filter((user) => user.user_id === req.user.id);
      res.status(200).send(userWorkout)
    })
}
exports.displayUserWorkout = ( req, res) => {
  knex("workouts")
    .join(
      "workout_exercise",
      "workout_exercise.workouts_id",
      "workouts.id"
    )
    .join(
      "exercises",
      "exercises.id",
      "workout_exercise.exercises_id"
    )
    .then((data) => {
      const userWorkout = data.filter((user) => user.user_id === req.user.id);
      res.status(200).send(userWorkout)
    })
}
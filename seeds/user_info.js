const userData = require("../seed_data/users");
const exerciseData = require("../seed_data/exercises");
const weightData = require("../seed_data/weight")
const postData = require("../seed_data/posts")
const workoutData = require('../seed_data/workouts')
const workoutExerciseData = require('../seed_data/workout_exercise')
const workoutTemplate = require('../seed_data/workout_templates')
const workoutTemplateExecise = require('../seed_data/workout_templates_exercise')
exports.seed = function (knex) {
  return knex("users")
    .del()
    .then(() => {
      return knex("users").insert(userData);
    })
    .then(() => {
      return knex("weight").del();
    })
    .then(() => {
      return knex("weight").insert(weightData);
    })
    .then(() => {
        return knex("exercises").del();
    })
    .then(() => {
        return knex("exercises").insert(exerciseData)
    })
    .then(() => {
      return knex("posts").del();
    })
    .then(() => {
      return knex("posts").insert(postData)
    })
    .then(() => {
      return knex("workouts").del();
    })
    .then(() => {
      return knex("workouts").insert(workoutData)
    })
    .then(() => {
      return knex("workout_exercise").del();
    })
    .then(() => {
      return knex("workout_exercise").insert(workoutExerciseData)
    })
    .then(() => {
      return knex("workout_templates").del();
    })
    .then(() => {
      return knex("workout_templates").insert(workoutTemplate)
    })
    .then(() => {
      return knex("workout_templates_exercise").del();
    })
    .then(() => {
      return knex("workout_templates_exercise").insert(workoutTemplateExecise)
    })
};

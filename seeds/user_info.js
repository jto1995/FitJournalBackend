const userData = require("../seed_data/users");
const exerciseData = require("../seed_data/workout");
const weightData = require("../seed_data/weight")

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
        return knex("workout").del();
    })
    .then(() => {
        return knex("workout").insert(exerciseData)
    })
};

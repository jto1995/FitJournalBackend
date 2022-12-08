const userData = require("../seed_data/users");
const exerciseData = require("../seed_data/exercises");
const weightData = require("../seed_data/weight")
const postData = require("../seed_data/posts")

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
};

const knex = require("knex")(require("../knexfile"));
const { v4: uuid } = require("uuid");

exports.getWorkoutHistory = (req,res) => {
    knex("workout")
    .then((data) => {
        res.status(200).send(data)
    })
    .catch((err) =>
    res.status(400).send('error retrieving history'))
}

exports.postNewWorkout = (req,res) => {
    if(
        !req.workout.exercise ||
        !req.workout.sets ||
        !req.workout.reps
    ){
        res.status(400).send("Please fill out your exercise")
    }else {
        knex("workout")
        .insert({id: uuid(), ...req.body})
        .then(() =>  {
            res.status(201).send("Your workout has been uploaded!")
        })
    }
    
}
const knex = require("knex")(require("../knexfile"));
const { v4: uuid } = require("uuid");
const fs = require("fs")

exports.getUserWeight = ( req, res ) => {
    knex("weight")
    .where("id", req.params.id) 
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) =>
    res.status(400).send('Error retrieving Weight Log')
    );
};

exports.newUserWeight = ( req, res ) => {
    if(
        !req.body.weight ||
        !req.body.bmi
    ){
        res.send(400).send("Please fill out your weight")
    } else {
        knew("weight")
        .where("id", req.params.id)
        .insert({ id: uuid(), ...req.body})
        .then(() => {
            res.status(201).send("Your weight has been uploaded")
        })
    }
}

exports.deleteUserWeight = ( req, res) => {
    knex("weight")
    .where("id", req.params.id)
    .del()
    .then((data) => {
        res.status(200).send('User weight has been deleted!')
    }) 
    .catch((err) => {
        res.status(500).send('Could not delete users weight please try again!')
    })
}

exports.editUserWeight = ( req, res ) => {
    knex("weight")
    .where("id", req.params.id)
    .update(req.body)
    .then((data) => {
        res.status(200).send('Users weight has been changed!')
    })
    .catch((err) => {
        res.status(500).send('Could not update users weight please try again!')
    })
}


const knex = require("knex")(require("../knexfile"));
const { v4: uuid} = require("uuid");
const fs = require("fs")

exports.newUserInfo = ( req, res ) => {
    if (
        !req.body.email ||
        !req.body.name ||
        !req.body.password
    ){
        res.status(400).send("Please fill out the sign up!")
    }
    else {
        knex("users")
        .insert({ id: uuid(), ...req.body})
        .then(() => {
            res.status(201).send('Thank you for signing up!')
        })

    }
}

exports.getUserInfo = ( req, res ) => {
    knex("users")
    .where("id", req.params.id)
    .then((data) => {
        res.status(200).json(data)
    })
    .catch((err) =>
    res.status(400).send('Error retrieving User Info')
    );
}

exports.deleteUserInfo = (req, res ) => {
    knex("users")
    .where("id", req.params.id)
    .del()
    .then((data) => {
        res.status(200).send("Your profile has been deleted")
    })
    .catch((err) =>{
        res.status(400).send('Could not delete your profile')
    })
}

exports.editUserInfo = ( req, res ) = {
//  knex("users")
}

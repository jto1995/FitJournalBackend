const knex = require("knex")(require("../knexfile"));
const { v4: uuid} = require("uuid");
const fs = require("fs")
const jwt = require('jsonwebtoken')

function checkToken(req, res, next) {
    const token = req.header.authorization.split(' ')[1];
    if (token && jwt.verify(token, JWT_SECRET)) {
        req.user = jwt.decode(token);
        next();
    }
    else {
        next();
    }
}

exports.newUserInfo = ( req, res ) => {
    if (
        !req.body.email ||
        !req.body.name ||
        !req.body.password
    ){
        res.status(400).send("Please fill out the sign up form!")
    }
    else {
        knex("users")
        .insert({ id: uuid(), ...req.body})
        .then(() => {
            res.status(201).send('Thank you for signing up!')
        })

    }
}

exports.getUserInfo = (checkToken, ( req, res ) => {
    knex("users")
    .where("id", req.params.id)
    .then((data) => {
        res.status(200).json(data)
    })
    .catch((err) =>
    res.status(400).send('Error retrieving User Info')
    );
})

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

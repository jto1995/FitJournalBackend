const knex = require("knex")(require("../knexfile"));
const { v4: uuid } = require("uuid");
const fs = require("fs")

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


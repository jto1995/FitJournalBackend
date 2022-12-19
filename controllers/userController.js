const knex = require("knex")(require("../knexfile"));
const { v4: uuid } = require("uuid");
const fs = require("fs");
const { runInNewContext } = require("vm");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

exports.newUserInfo = (req, res) => {
  if (!req.body.email || !req.body.name || !req.body.password) {
    res.status(400).send("Please fill out the sign up form!");
  } else {
    knex("users")
      .insert({ id: uuid(), ...req.body })
      .then(() => {
        res.status(201).send("Thank you for signing up!");
      });
  }
};

//Get User INfo

exports.getUserInfo = (req, res) => {
  if (req.user) {
    knex("users").then((data) => {
      const userProfile = data.filter((user) => user.id === req.user.id);
      res.json(userProfile);
    });
  }
};

exports.getUsersProfile = (req, res) => {
  knex("users")
  .where("users.id", req.params.id)
  .then((data) => {
    res.status(200).send(data);
  })
  .catch((err) => res.status(400).send(`${err} retrieving history`))
}

// Delete User

exports.deleteUserInfo = (req, res) => {
  knex("users")
    .where("id", req.params.id)
    .del()
    .then(() => {
      res.status(200).send("Your profile has been deleted");
    })
    .catch((err) => res.status(400).send("Could not delete your profile"));
};

// Edit User

exports.editUserInfo = (req, res) => {
  knex("users")
    .where("id", req.params.id)
    .update(req.body)
    .then((data) => {
      res.status(200).send("Your profile has been edit");
    })
    .catch((err) => res.status(400).send("Could not edit your profile"));
};

//Login User

exports.loginUser = (req, res) => {
  if (req.body.email && req.body.password) {
    knex("users")
      .then((data) => {
        const foundUser = data.find(
          (user) =>
            user.email == req.body.email && user.password === req.body.password
        );
        if (foundUser) {
          const jwtToken = jwt.sign(
            { id: foundUser.id, name: foundUser.name },
            JWT_SECRET
          );
          res.json({
            message: "login succesful",
            token: jwtToken,
          });
        } else {
          res.status(401).send("User not found! Please Sign up!");
        }
      })
      .catch((err) => {
        res.status(400).send("Error retrieveing ");
      });
  } else {
    res.status(400).send("please provide user info");
  }
};



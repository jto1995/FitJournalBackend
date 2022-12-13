const knex = require("knex")(require("../knexfile"))
const { v4: uuid} = require("uuid")

exports.getPosts = ( _req, res ) => {
    knex("posts")
    .join("users", "users.id", "posts.user_id")
    .select(
        "posts.id",
        "posts.user_id",
        "posts.post",
        "posts.likes",
        "posts.created_at",
        "users.name",
        )
    .then((data) => {
        res.status(200).json(data)
    })}

exports.newPost = ( req, res ) => {
    knex("posts")
    .insert({ id: uuid(), user_id: req.user.id, ...req.body})
    .then(() => {
        res.status(201).send('Post has been uploaded')
    })
}



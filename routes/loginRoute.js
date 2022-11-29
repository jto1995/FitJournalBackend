const knex = require("knex")(require("../knexfile"))

exports.checkLogin = ( req, res ) => {
    if (req.body.email && req.body.password) {
        const foundUser = users.find(
            (user) =>
            user.email === req.body.email & user.password === req.body.password
        )
    }
}

module.exports = router;
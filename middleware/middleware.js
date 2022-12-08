const { JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');

exports.checkToken = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    if (token && jwt.verify(token, JWT_SECRET)) {
        req.user = jwt.decode(token);
        next();
    }
    else {
        return res.status(400).send('Invalid Token')
    }
}
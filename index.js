require('dotenv').config();
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken')
const cors = require('cors')
const { PORT, JWT_SECRET } = process.env;
const userRoute = require("./routes/userRoute")
const weightRoute = require("./routes/weightRoute")
const workoutRoute = require("./routes/workoutRoute")
const loginRoute = require('./routes/loginRoute')

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use("/weight", weightRoute);
app.use("/user", userRoute);
app.use("/workout", workoutRoute);
app.use("/login", loginRoute)

app.listen(PORT, function() {
    console.log(`Your server is running at http://localhost:${PORT}`)
})
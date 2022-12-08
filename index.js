require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')
const { PORT } = process.env;
const userRoute = require("./routes/userRoute")
const weightRoute = require("./routes/weightRoute")
const workoutRoute = require("./routes/workoutRoute")
const postsRoute = require("./routes/postsRoute")

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use("/weight", weightRoute);
app.use("/user", userRoute);
app.use("/workout", workoutRoute);
app.use("/posts", postsRoute)

app.listen(PORT, function() {
    console.log(`Your server is running at http://localhost:${PORT}`)
})
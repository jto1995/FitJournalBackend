require('dotenv').config();
const express = require('express');
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 8080

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.listen(PORT, function() {
    console.log('Your server is running at http://localhost:'+ PORT)
})
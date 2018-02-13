const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
var multer = require('multer');
var fs = require('fs');

// Connect to database
mongoose.connect(config.database);

// On connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
})

// On error
mongoose.connection.on('error', (err) => {
    console.log('Database error ' + err);
})

const app = express();

const users = require('./routes/users');

// Port number
const port = 3000;

// CORS Middelware
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middelware
app.use(bodyParser.json());

// Passport middelware
app.use(passport.initialize());
app.use(passport.session());

// app.use(multer({dest:'./uploads/'}).single('recfile'));

require('./config/passport')(passport);

app.use('/users', users)

// Index Route
app.get('/', (req, res) => {
    res.send('Invalid endport');
});

app.get('*', () => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start router
app.listen(port, () => {
    console.log('Server startet on port: ' + port);
});
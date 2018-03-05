"use strict";
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database')

const User = require('../models/user');
const Ranking = require('../models/ranking');

const multer = require('multer');
const fs = require('fs');
var upload = multer({ dest: 'upload/'});

// Register
// router.post('/register', (req, res, next) => {
//     let newUser = new User({
//         firstName: req.body.firstName,
//         email: req.body.email,
//         username: req.body.username,
//         password: req.body.password
//     });

//     User.addUser(newUser, (err, user) => {
//         if (err) {
//             res.json({success: false, msg: 'Failed to register user'})
//         } else {
//             res.json({success: true, msg: 'User registered'})
//         }
//     });
    

// });
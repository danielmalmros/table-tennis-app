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
router.post('/register', (req, res, next) => {
    let newUser = new User({
        firstName: req.body.firstName,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    let username = req.body.username

    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({success: false, msg: 'Failed to register user'})
        } else {
            res.json({success: true, msg: 'User registered'})
            Ranking.addUserToRanking(username)
        }
    });

    // Ranking.addUserToRanking(username, (err, user) => {
    //     if (err) {
    //         res.json({success: false, msg: 'Failed to add user to ranking'})
    //     } else {
    //         res.json({success: true, msg: 'User registered in raking list'})
    //         Ranking.addUserToRanking(username)
    //     }
    // })
    
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err) {
            throw err;
        }

        if (!user) {
            return res.json({success: false, msg: 'User not found'})
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) {
                throw err
            }
            if (isMatch) {
                const token = jwt.sign({data: user}, config.secret, {
                    expiresIn: 604800 // 1 week
                });
                
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        firstName: user.firstName,
                        username: user.username,
                        email: user.email
                    }
                })
            } else {
                return res.json({success: false, msg: 'Wrong password'})
            }
        })
    });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.json({
        user: req.user
    })
});

// Edit profile
router.post('/editprofile/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    User.findByIdAndUpdate(req.params.id, {
        $set: {
            "firstName": req.body.firstName,
            "lastName": req.body.lastName,
            "team": req.body.team,
            "email": req.body.email
        }
    },{
        upsert: true
    },
    (err, updatedUser) => {
        if (err) {
            res.send('Error updating user!');
        } else {
            return res.json({success: true, message: 'User updated!' });
        }   
    });
});

// Add Single wins
router.post('/addsinglewins/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    User.findByIdAndUpdate(req.params.id, {
        $inc: {
            "singleWins": req.body.singleWins
        }
    },{
        upsert: true
    },
    (err, updatedUser) => {
        if (err) {
            res.send('Error updating single wins!');
        } else {
            return res.json({success: true, message: 'Single wins updated!' });
        }   
    });
});

// Add Single wins
router.post('/adddoublewins/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    User.findByIdAndUpdate(req.params.id, {
        $inc: {
            "doubleWins": req.body.doubleWins
        }
    },{
        upsert: true
    },
    (err, updatedUser) => {
        if (err) {
            res.send('Error updating double wins!');
        } else {
            return res.json({success: true, message: 'Double wins updated!' });
        }   
    });
});


module.exports = router;
"use strict";
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database')

const User = require('../models/user');

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
    
    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({success: false, msg: 'Failed to register user'})
        } else {
            res.json({success: true, msg: 'User registered'})
        }
    });
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


// Profile image
// router.post('/picture-upload', upload.single('avatar'), (req, res, next) => {
//     // let newProfileImg = {
//     //     img: req.body.img
//     // }
    

//     var user = req.body;
//     user.avatar.data = fs.readFileSync(req.file.path);
//     user.avatar.contentType = req.file.mimetype;

//     let newProfileImg = user.avatar.data;
//     let fileType = user.avatar.contentType

//     User.addProfileImage(newProfileImg, fileType, (err, user) => {
//         if (err) {
//             res.json({success: false, msg: 'Failed to register profile image'})
//         } else {
//             res.json({success: true, msg: 'Images uploaded'})
//         }
//     });
// });


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
            "singleWins": req.body.singleWins
        }
    },{
        upsert: true
    },
    (err, updatedUser) => {
        if (err) {
            res.send('Error updating user!');
        } else {
            return res.json({ message: 'User updated!' });
        }   
    });
});

module.exports = router;
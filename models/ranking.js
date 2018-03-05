"use strict";
const mongoose = require('mongoose');
const config = require('../config/database');
const User = require('./user');

// Ranking schema
let RankingSchema = mongoose.Schema({
    userId: {
        type: String,
        default: ''
    },
    placement: {
        type: Number,
        default: 0
    }
});

const Ranking = module.exports = mongoose.model('Ranking', RankingSchema);

// module.exports.getRankingList = (id, callback) => {
//     Ranking.find().all(function(user) {

//     });
// }


module.exports.addUserToRanking = (username, callback) => {
    const query = {username: username}
    let user = User.find(query).toArray()

    console.log('HERE IS', user);

    let newUser = new Ranking({
        userId: user._id
    })
    //insert style object to products collection
    Ranking.save(newUser);
}
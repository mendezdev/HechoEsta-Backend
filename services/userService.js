const User = require('../models/user');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) =>{
            if(err) throw err;

            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
    const query = {username: username};

    User.findOne(query, callback);
}

module.exports.comparePassword = function(password, hash, callback){
    bcrypt.compare(password, hash, (err, isMatch) => {
        if(err) throw err;

        callback(null, isMatch);
    })
}
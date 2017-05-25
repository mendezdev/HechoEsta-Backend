const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const config = require('../config/database');
const userSerivce = require('../services/userService');
// OTHER Requires

router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        level: req.body.level,
        status: req.body.status
    });

    userSerivce.addUser(newUser, (err, user) => {
        if(err){
            res.json({success: false, msg:"Failed to register user", err: err});
        } else {
            res.json({success: true, msg:"User registered"});
        }
    });
});

router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    userSerivce.getUserByUsername(username, (err, user) => {
        if(err) throw err;

        // If user not found, I return a response with that message
        if(!user){
            return res.json({
                success: false,
                msg: "User not found"
            });
        }

        // When a user is founded then I compare the password
        userSerivce.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;

            if(isMatch){
                const token = jwt.sign(user, config.secret, {
                    expiresIn: 604800
                });

                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email,
                        status: user.status
                    }
                });
            } else {
                return res.json({
                    success: false,
                    msg: "Wrong password"
                });
            }
        });
    });
});

router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.json({user: req.user});
});

module.exports = router;
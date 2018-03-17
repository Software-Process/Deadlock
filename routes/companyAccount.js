var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
var User = require('../models/user');
const question = require("../models/question");

/* GET home page. */
router.get('/', function(req, res, next) {
    question.find()
        .exec()
        .then(docs => {
            if (req.user){
                res.render('companypage', { user : req.user });
            } else {
                res.render('companypage', { user : req.user });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(200).json({
                error: err
        });
    }); 
});

/* Registers a user with the information received from a POST request.*/
router.post('/', function(req, res) {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        admin: "",
        company: "yes",
        picture: 1,
        bannerColor: '#116CF6'
    });

    User.register(user, req.body.password, function(err, user ) {
        if (err) {
            return res.render('signIn', { user : user, reg: err });
        }
        res.redirect('/');
    });
});
module.exports = router;
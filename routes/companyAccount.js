var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
var User = require('../models/user');
const question = require("../models/question");
/* GET home page. */
//date: new Date().toUTCString()
router.get('/', function(req, res, next) {
    question.find()
        .exec()
        .then(docs => {
            if (req.user){
                res.render('companypage', { user : req.user });
            } else {
                res.render('companypage',{ user : req.user });
                }
        })
        .catch(err => {
            console.log(err);
            res.status(200).json({
                error: err
        });
    }); 
});
/** 
router.post('/', function(req, res, next) {
    var genId = new mongoose.Types.ObjectId();
    console.log(req.user);
    const jobs = new Jobs({
        _id: genId,
        title: req.body.title,
        company: req.body.company,
        link: req.body.link,
        author: req.body.author,
        date: new Date().toUTCString()
    });
    jobs
        .save()
        .then(function(result){
            res.redirect('/');      
    })
        .catch(function(err){
            console.log(err);
            res.status(500).json({
                error:err
            });
        });

});*/

/* Registers a user with the information received from a POST request.*/
router.post('/', function(req, res) {

   // const errors = validationResult(req);
   /* if (!errors.isEmpty()) {
        const errs = errors.array()[0];
        output = errs.param + " " + errs.msg;
        return res.render('signIn', { reg:output });
    }*/

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
            console.log(err);
            return res.render('signIn', { user : user, reg: err });
        }

        //passport.authenticate('local')(req, res, function () {

            res.redirect('/');
        //});
    });
});
module.exports = router;
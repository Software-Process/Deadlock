var express = require('express');
var passport = require('passport');
var User = require('../models/user');
var router = express.Router();


router.get('/', function (req, res) {
    res.render('signIn', { user : req.user });
});

router.get('/register', function(req, res) {
    res.render('register', { });
});

router.post('/register', function(req, res) {
    console.log(req.body.username);
    console.log(req.body.password);

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        picture: 1,
        bannerColor: '#116CF6'
    });

    User.register(user, req.body.password, function(err, user ) {
        if (err) {
            console.log(err);
            return res.render('signIn', { user : user, reg: err });
        }

        passport.authenticate('local')(req, res, function () {

            res.redirect('/');
        });
    });
});

router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    console.log(req);
    res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
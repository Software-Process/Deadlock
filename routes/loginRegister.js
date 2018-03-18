var express = require('express');
var passport = require('passport');
var User = require('../models/user');
var router = express.Router();

const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

/* GET Login/Registration page. */
router.get('/', function (req, res) {
    res.render('signIn', { user : req.user });
});

router.get('/register', function(req, res) {
    res.render('register', { });
});

/* Registers a user with the information received from a POST request.*/
router.post('/register', [
    check('username').not().isEmpty().withMessage("cannot be empty"),
    check('password').not().isEmpty().withMessage("cannot be empty"),
    check('email').not().isEmpty().withMessage("cannot be empty"),
    check('confirmpassword').not().isEmpty().withMessage("cannot be empty"),
    check('email').isEmail().withMessage('must be a valid email address'),
    check('password', 'passwords must be at least 5 characters long and contain one number')
        .isLength({ min: 5 })
        .matches(/\d/),
    check('confirmpassword').custom((value, { req }) => value === req.body.password).withMessage("must match the password field")
],function(req, res) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errs = errors.array()[0];
        output = errs.param + " " + errs.msg;
        return res.render('signIn', { reg:output });
    }

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        admin: "",
        company: "",
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

/* Logs a user in and redirects them to home page.*/
// router.post('/login', passport.authenticate('local'), function(req, res) {
//     console.log(res);
//     res.redirect('/');
// });

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.render('signIn', {sig: "Please enter a user name."}) }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.render('index',{ user: user});
        });
    })(req, res, next);
});

/* Logs a user out and redirects them to home page. */
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
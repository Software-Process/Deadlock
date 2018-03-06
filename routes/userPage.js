var express = require('express');
var router = express.Router();

const Question = require("../models/question");

/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.user){
        res.render('userpage', {user : req.user });
    } else {
        res.render('signIn');
    }
});

module.exports = router;
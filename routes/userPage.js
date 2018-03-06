var express = require('express');
var router = express.Router();

const Question = require("../models/question");

/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.user){
        const genderBoolean = req.user.gender == 'true';
        res.render('userpage', {user : req.user , gender : genderBoolean});

    } else {
        res.render('signIn');
    }
});

module.exports = router;
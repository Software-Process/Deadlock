var express = require('express');
var router = express.Router();

const Question = require("../models/question");
const Reply = require("../models/reply");

/* GET user page, passing user information. */

router.get('/', function(req, res, next){
    if (req.user) { 
        var answerDocs;
        var questionDocs;
        // req.user.username
        Question.find({username:req.user.username})
            .exec()
            .then(docs1 => {
                questionDocs = docs1;
                Question.find({ 'replies.username' : req.user.username})
                    .exec()
                    .then(docs2 => {
                        answerDocs = docs2;
                        res.render('userpage', {user : req.user , answers : answerDocs, questions: questionDocs});
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(200).json({
                        error: err
                    });
                });
            })
            .catch(err => {
                console.log(err);
                res.status(200).json({
                    error: err
                });
            });

    } else {
        res.render('signIn');
    }
});

module.exports = router;
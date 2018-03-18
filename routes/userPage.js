var express = require('express');
var router = express.Router();

const Question = require("../models/question");
const Reply = require("../models/reply");
const User =  require("../models/user");
/* GET user page, passing user information. */

router.get('/', function(req, res, next){
    if (req.user) { 
        var answerDocs;
        var questionDocs;
        // req.user.username
        Question.find({username:req.user.username})
            .exec()
            .then(docs1 => {
                questionDocs = docs1.reverse();
                Question.find({ 'replies.username' : req.user.username})
                    .exec()
                    .then(docs2 => {
                        answerDocs = docs2.reverse();
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
router.get('/:name', function(req, res, next){
const uname = req.params.name;

    if (req.user && (uname == req.user.username)) { 
        var answerDocs;
        var questionDocs;
        Question.find({username:req.user.username})
            .exec()
            .then(docs1 => {
                questionDocs = docs1.reverse();
                Question.find({ 'replies.username' : req.user.username})
                    .exec()
                    .then(docs2 => {
                        answerDocs = docs2.reverse();
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
        var answerDocs;
        var questionDocs;
        var userDocs;
        User.find({username:uname})
            .exec()
            .then(accounts => {
               Question.find({username:uname})
                .exec()
                .then(docs1 => {
                    questionDocs = docs1.reverse();
                    Question.find({ 'replies.username' : uname})
                        .exec()
                        .then(docs2 => {                   
                            answerDocs = docs2.reverse();
                            res.render('userpageexternal', { user: accounts[0] , answers : answerDocs, questions: questionDocs, logedUser: req.user });
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
                
            })
            .catch(err => {
                console.log(err);
                res.status(200).json({
                    error: err
                });
            });
    }
});
module.exports = router;
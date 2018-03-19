const express = require('express');
const router = express.Router();

const Question = require("../models/question");
const User =  require("../models/user");


/* GET user page, will reflect the logged-in user. */
router.get('/', function(req, res, next){
    if (req.user) { 
        let answerDocs;
        let questionDocs;
        Question.find({username:req.user.username})
            .then(docs1 => {
                questionDocs = docs1.reverse();
                Question.find({ 'replies.username' : req.user.username})
                    .then(docs2 => {
                        answerDocs = docs2.reverse();
                        res.render('userpage', {user : req.user , answers : answerDocs, questions: questionDocs, allowEdit: "True"});
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

/* GET user page of a different user than the logged-in one, or
 * allows a non-logged in user to view a user page */
router.get('/:name', function(req, res, next){
const uname = req.params.name;

    if (req.user && (uname === req.user.username)) {
        res.redirect('/userPage');

    } else {
        let answerDocs;
        let questionDocs;
        User.find({username:uname})
            .then(accounts => {
               Question.find({username:uname})
                .then(docs1 => {
                    questionDocs = docs1.reverse();
                    Question.find({ 'replies.username' : uname})
                        .then(docs2 => {                   
                            answerDocs = docs2.reverse();
                            if (!req.user) {
                                res.render('userpage', {
                                    user: accounts[0],
                                    answers: answerDocs,
                                    questions: questionDocs,
                                    noLogin: true
                                });
                            } else {
                                res.render('userpage', {
                                    user: accounts[0],
                                    answers: answerDocs,
                                    questions: questionDocs,
                                    curUser: req.user
                                })
                            }
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
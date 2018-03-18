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
        // req.user.username
        Question.find({username:req.user.username})
            .exec()
            .then(docs1 => {
                questionDocs = docs1.reverse();
                Question.find({ 'replies.username' : req.user.username})
                    .exec()
                    .then(docs2 => {
                        answerDocs = docs2.reverse();console.log("\n************123123888888888888"+req.user);
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
        //res.render('signIn');
        console.log("****************ELSEEEEEEEE******");
        var answerDocs;
        var questionDocs;
        var userDocs;
        // req.user.username
        User.find({username:uname})
            .exec()
            .then(accounts => {
                //userDocs=docs.reverse();
                console.log("\n************TAKE 1"+accounts);
                Question.find({username:uname})
                //.exec()
                .then(docs1 => {
                    questionDocs = docs1.reverse();
                    console.log("\n************TAKE 2"+accounts);
                    Question.find({ 'replies.username' : uname})
                       // .exec()
                        .then(docs2 => {
                            
                             console.log("\n************TAKE 3"+accounts);
                            answerDocs = docs2.reverse();
                            console.log("********BEFORE PRINTT"+req.user+"-------------------- "+accounts["username"]+" 888888 "+accounts.email+"\n 555555");
                            res.render('userpage', { accounts , answers : answerDocs, questions: questionDocs, user: req.user});
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
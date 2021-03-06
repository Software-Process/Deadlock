const express = require("express");
const router = express.Router();

const Question = require("../models/question");
const User =  require("../models/user");

router.patch("/:userId/clear", function (req, res, next) {
    const name = req.params.userId;
    User.update({username: name},
        {
            $set: {
                repAccNew: 0,
                repRejNew: 0
            }
        })
        .exec()
        .then(res.redirect("/userPage"))
        .catch(function (err) {
            res.status(500).json({error: err});
        });
});
/* GET user page, will reflect the logged-in user. */
router.get("/", function(req, res, next){
    if (req.user) { 
        let answerDocs;
        let questionDocs;
        let accReplied = [];
        let rejReplied = [];
        Question.find({username:req.user.username})
            .then(docs1 => {
                questionDocs = docs1.reverse();
                Question.find({ "replies.username" : req.user.username})
                    .then(docs2 => {
                        answerDocs = docs2.reverse();
                        for(let i = 0; i < answerDocs.length; i++) {
                            for(let j = 0; j < answerDocs[i].replies.length; j++) {
                                if(answerDocs[i].replies[j].username == req.user.username && answerDocs[i].replies[j].accepted) {
                                    accReplied.push(answerDocs[i]);
                                }
                                if(answerDocs[i].replies[j].username == req.user.username && answerDocs[i].replies[j].rejected) {
                                    rejReplied.push(answerDocs[i]);
                                }
                            }
                        }
                        res.render("userPage", {
                            user : req.user ,
                            answers : answerDocs, 
                            questions: questionDocs, 
                            allowEdit: "True", 
                            accReplies: accReplied, 
                            rejReplies: rejReplied
                        });
                    })
                    .catch(err => {
                        res.status(200).json({
                            error: err
                        });
                    });
            })
            .catch(err => {
                res.status(200).json({
                    error: err
                });
            });

    } else {
        res.render("signIn");
    }
});

/* GET user page of a different user than the logged-in one, or
 * allows a non-logged in user to view a user page */
router.get("/:name", function(req, res, next){
    const uname = req.params.name;

    if (req.user && (uname === req.user.username)) {
        res.redirect("/userPage");

    } else {
        let answerDocs;
        let questionDocs;
        let accReplied = [];
        let rejReplied = [];
        User.find({username:uname})
            .then(accounts => {
                Question.find({username:uname})
                    .then(docs1 => {
                        questionDocs = docs1.reverse();
                        Question.find({ "replies.username" : uname})
                            .then(docs2 => {
                                answerDocs = docs2.reverse();
                                for(let i = 0; i < answerDocs.length; i++) {
                                    for(let j = 0; j < answerDocs[i].replies.length; j++) {
                                        if(answerDocs[i].replies[j].username == uname && answerDocs[i].replies[j].accepted) {
                                            accReplied.push(answerDocs[i]);
                                        }
                                        if(answerDocs[i].replies[j].username == uname && answerDocs[i].replies[j].rejected) {
                                            rejReplied.push(answerDocs[i]);
                                        }
                                    }
                                }
                                if (!req.user) {
                                    res.render("userPage", {
                                        user: accounts[0],
                                        answers: answerDocs,
                                        questions: questionDocs,
                                        noLogin: true,
                                        accReplies: accReplied,
                                        rejReplies: rejReplied

                                    });
                                } else {
                                    res.render("userPage", {
                                        user: accounts[0],
                                        answers: answerDocs,
                                        questions: questionDocs,
                                        curUser: req.user,
                                        accReplies: accReplied,
                                        rejReplies: rejReplied
                                    });
                                }
                            })
                            .catch(err => {
                                res.status(200).json({
                                    error: err
                                });
                            });
                    })
                    .catch(err => {
                        res.status(200).json({
                            error: err
                        });
                    });
                
            })
            .catch(err => {
                res.status(200).json({
                    error: err
                });
            });
    }
});
module.exports = router;
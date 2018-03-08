var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const Reply = require("../models/reply");

const Question = require("../models/question");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('question', { title: 'Express' });
});

router.get('/:questionId', function(req, res, next) {
    const id = req.params.questionId;
    Question.findById(id)
        .exec()
        .then(function(doc){
            console.log("From database", doc);
            if (doc){
                res.render('question', { question: doc });
            } else {
                res.status(404).json({message: "No valid entry found for provided id"});
            }
        })
        .catch(function(err){
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
});

router.patch('/:questionId/up', function(req, res, next) {
    const id = req.params.questionId;
    Question.update({_id : id},{$inc : {'score' : 1}})
        .exec()
        .then(function(result){
            res.redirect('back');
        })
        .catch(function(err){
            console.log(err);
            res.status(500).json({error:err});
        });
});

router.patch('/:questionId/down', function(req, res, next) {
    const id = req.params.questionId;
    Question.update({_id : id},{$inc : {'score' : -1}})
        .exec()
        .then(function(result){
            res.redirect('back');
        })
        .catch(function(err){
            console.log(err);
            res.status(500).json({error:err});
        });
});

router.patch('/:questionId/reply', function(req, res, next) {
    const id = req.params.questionId;
    const toSave = new Reply ({ author: req.user._id, username: req.user.username, text: req.body.repform, score: 0, accepted: false, rejected: false});
    console.log(toSave);
    Question.update({_id : id},{ $push: { replies:  toSave}}) // Replace testUser with logged in user
        .exec()
        .then(function(result){
            res.redirect('back');
        })
        .catch(function(err){
            console.log(err);
            res.status(500).json({error:err});
        });
});


router.patch('/:replyId/accept', function(req, res, next) {

    const repId = req.params.replyId;

    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@");
    console.log("Reply id :" + repId);
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@");

    /*
    Question.update({_id : repId},{$set : {'accepted' : true}})
        .exec()
        .then(function(result){
            res.redirect('back');
        })
        .catch(function(err){
            console.log(err);
            res.status(500).json({error:err});
        });
    */
});

router.patch('/:replyId/upReply', function(req, res, next) {
    const repId = req.params.replyId;
    const id = req.body.questionId;
    console.log("qeu "+id);
    console.log("Reply id :" + repId);

    Question.update({_id : id}, {$inc : {'replies.0.nbOfVotesRep' : 1}})
        .exec()
        .then(function(result){
            res.redirect('back');
        })
        .catch(function(err){
            console.log(err);
            res.status(500).json({error:err});
        });

        console.log("DONE");

    
});

router.patch('/:replyId/downReply', function(req, res, next) {
    const repId = req.params.replyId;
    const id = req.body.questionId;
    console.log("qeu "+id);
    console.log("Reply id :" + repId);
    
    Question.update({_id : id}, {$inc : {'replies.0.nbOfVotesRep' : -1}})
        .exec()
        .then(function(result){
            res.redirect('back');
        })
        .catch(function(err){
            console.log(err);
            res.status(500).json({error:err});
        });

        console.log("DONE");

    
});

module.exports = router;



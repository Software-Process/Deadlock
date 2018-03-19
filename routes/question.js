var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const Reply = require("../models/reply");

const Question = require("../models/question");

/* GET request for base page; should never be shown under normal circumstances.*/
router.get('/', function(req, res, next) {
    res.render('question', { title: 'Express' });
});

/* GETs the question with the specified question ID. */
router.get('/:questionId', function(req, res, next) {
    const id = req.params.questionId;
    Question.findById(id)
        .exec()
        .then(function(doc){                 
            if (doc){
                res.render('question', { question: doc, user: req.user, tags: doc.tags });
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

/* Upvotes the question via a PATCH request */
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

/* Downvotes the question via a PATCH request */
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

/* Adds a new reply to the question via a PATCH request */
router.patch('/:questionId/reply', function(req, res, next) {
    const id = req.params.questionId;
    const toSave = new Reply ({ author: req.user._id, username: req.user.username, text: req.body.repform, score: 0, accepted: false, rejected: false});
    console.log(toSave);
    Question.update({_id : id},{ $push: { replies:  toSave}})// Replace testUser with logged in user
        .exec()
        .then(function(result){
            res.redirect('back');
        })
        .catch(function(err){
            console.log(err);
            res.status(500).json({error:err});
        });
});

/* Accepts a reply via a PATCH request */
router.patch('/:replyId/accept', function(req, res, next) {
    const repId = req.params.replyId;
});

/* Upvotes a reply via a PATCH request */
router.patch('/:replyId/upReply', function(req, res, next) {
    const repId = req.params.replyId;
    const id = req.body.questionId;
    console.log("qeu "+id);
    console.log("Reply id :" + repId);
    Question.updateOne({"replies._id" : repId}, {$inc : {"replies.$.score" : 1}})
        .exec()
        .then(function(result){
            res.redirect('back');
        })
        .catch(function(err){
            console.log(err);
            res.status(500).json({error:err});
        });
});

/* Downvotes a reply via a PATCH request */
router.patch('/:replyId/downReply', function(req, res, next) {
    const repId = req.params.replyId;
    const id = req.body.questionId;

    Question.updateOne({"replies._id" : repId}, {$inc : {"replies.$.score" : -1}})
        .exec()
        .then(function(result){
            res.redirect('back');
        })
        .catch(function(err){
            console.log(err);
            res.status(500).json({error:err});
        });
});

module.exports = router;
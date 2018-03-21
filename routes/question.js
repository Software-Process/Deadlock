const mongoose = require("mongoose");
var express = require('express');
var async = require('async');

var router = express.Router();

const Reply = require("../models/reply");
const Question = require("../models/question");
const History = require("../models/history");
const User =  require("../models/user");

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
    const toSave = new Reply ({
        text: req.body.repform,
        score: 0,
        author: req.user._id,
        username: req.user.username,
        date: new Date().toUTCString(),
        question: id,        
        accepted: false,
        rejected: false
    });
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

function getPropertyWithTag(tag) {
    var property = "tag";

    switch(tag) {
        case "C++":
            property += "CPlusPlus";
            break;
        case "C#":
            property += "CSharp";
            break;
        case "Visual Basic":
            property += "VisualBasic";
            break;
        default:
            property += tag;
            break;
    }

    return property;
}

router.patch('/:qustionId/:replyId/accept', function(req, res, next) {
    const repId = req.params.replyId;
    const questionId = req.params.qustionId;
    var questionTags;
    var uname;
    var author;

    Question.find({_id: questionId}, function(err, obj) {

        var replies = obj[0].replies;
        var questionTags = obj[0].tags;

        for(var i = 0; i < replies.length; ++i) {
            if (replies[i]._id == repId) {
                uname = replies[i].username;
                author = replies[i].author;
                break;
            }
        }

        Question.update({_id : questionId}, {$set : {'replyAuthor' : uname}})
            .exec()
            .catch(function(err){
                console.log(err)
                res.status(500).json({error:err})
            })

        .then(docs => {                    
            async.eachSeries(questionTags, function updateObject (rec, callback) {

                var tag = rec
                var property = getPropertyWithTag(tag)

                User.find({ username : uname }, function(err, obj) {
                    var userId = obj[0]._id
                    var query = {}                    
                    var propertyValue = obj[0][property]

                    query[property] = propertyValue + 1
                
                    User.update({_id : userId}, {$set : query})
                        .exec()
                        .catch(function(err){
                            console.log(err)
                            res.status(500).json({error:err})
                        })
                    callback()
                })

            }, function allDone (err) {
                // This will run once the array has been iterated over completely
            })
        }) 
    });
    Question.updateOne({"replies._id" : repId}, {$set : {"replies.$.accepted" : true}})
        .exec()
        .then(
        Question.updateOne({"replies._id" : repId}, {$set : {"hasAccepted" : true}})
            .exec()
            .then(function(result){
                res.redirect('back');
            })
            .catch(function(err){
                console.log(err);
                res.status(500).json({error:err});
        }));
});

/* Rejects a reply via a PATCH request */
router.patch('/:qustionId/:replyId/reject', function(req, res, next) {
    const repId = req.params.replyId;
    Question.updateOne({"replies._id" : repId}, {$set : {"replies.$.rejected" : true}})
        .exec()
        .then(function(result){
            res.redirect('back');
        })
        .catch(function(err){
            console.log(err);
            res.status(500).json({error:err});
        });
});

/* Upvotes a reply via a PATCH request */
router.patch('/:replyId/upReply', function(req, res, next) {
    const repId = req.params.replyId;
    Question.update({"replies._id" : repId}, {$inc : {"replies.$.score" : 1}})
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
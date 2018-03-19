var express = require('express');
var router = express.Router();

const mongoose = require("mongoose");

const Question = require("../models/question");

/*To render the question-prompt.hbs page. Redirects if user is not signed in.*/
router.get('/', function(req, res, next) {
    if (req.user) {
        res.render('question-prompt', {title: 'Ask a question page'});
    } else {
        res.render('signIn');
    }
});

/* Submits a question via a POST request.*/
router.post('/', function(req, res, next) {
    var genId = new mongoose.Types.ObjectId();
    const question = new Question({
        _id: genId,
        title: req.body.title,
        text: req.body.question,
        score: 0,
        nbOfAnswers: 0,
        author: req.user._id,
        username: req.user.username,
        date: new Date().toUTCString(),
        replies: [],
        tags: req.body.tag
    });
    question
        .save()
        .then(function(result){
            var path = '/question/' + genId;
            res.redirect(path);        
    })
        .catch(function(err){
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
});
module.exports = router;
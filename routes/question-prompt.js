const express = require('express');
const router = express.Router();

const mongoose = require("mongoose");

const Question = require("../models/question");

const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

/*To render the question-prompt.hbs page. Redirects if user is not signed in.*/
router.get('/', function(req, res, next) {
    if (req.user) {
        res.render('question-prompt', {title: 'Ask a question page'});
    } else {
        res.render('signIn');
    }
  });

/* Submits a question via a POST request.*/
router.post('/', [
    check('title').not().isEmpty().withMessage("cannot be empty"),
    check('question').not().isEmpty().withMessage("cannot be empty"),

], function(req, res, next) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errs = errors.array()[0];
        output = errs.param + " " + errs.msg;
        return res.render('question-prompt', { err:output });
    }
    const genId = new mongoose.Types.ObjectId();

    const question = new Question({
        _id: genId,
        title: req.body.title,
        text: req.body.question,
        score: 0,
        nbOfAnswers: 0,
        author: req.user._id,
        username: req.user.username,
        date: new Date().toUTCString(),
        replies: []
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
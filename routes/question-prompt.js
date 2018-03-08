var express = require('express');
var router = express.Router();

const mongoose = require("mongoose");

const Question = require("../models/question");

/*To render the question-prompt.hbs page*/
router.get('/', function(req, res, next) {
    res.render('question-prompt', { title: 'Ask a question page' });
  });

/*POST linked with question-prompt page*/
router.post('/', function(req, res, next) {
    var genId = new mongoose.Types.ObjectId();
    console.log(req);
    const question = new Question({
        _id: genId,
        title: req.body.title,
        text: req.body.question,
        nbOfVotes: 0,
        nbOfAnswers: 0,
		user: req.user.username,
        author: req.body.author,
        date: new Date().toUTCString(),
        replies: {}
    });
    question
        .save()
        .then(function(result){
            var path = '/question/' + genId;
            res.redirect(path);        
            console.log(result);
            
            /*res.status(201).json({
                message: "Created question",
                createdQuestion:{
                    title: result.title,
                    text: result.question,
                    nbOfVotes: result.nbOfVotes,
                    nbOfAnswers: result.nbOfAnswers,
                    author: req.body.author,
                    _id: result._id,
                    request:{
                        type: "GET",
                        url: "http://localhost:3000/questions/" + result._id
                    }
                }
            
        });*/
    })
        .catch(function(err){
            console.log(err);
            res.status(500).json({
                error:err
            });
        });

});
module.exports = router;
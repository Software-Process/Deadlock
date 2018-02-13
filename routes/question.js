var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");

const Question = require("../models/question");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('question', { title: 'Express' });
});

router.get('/:questionId', function(req, res, next) {
    const id = req.params.questionId;
    Question.findById(id)
        .select("title text score")
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

module.exports = router;

const express = require ('express');
const router = express.Router();
const mongoose = require("mongoose");

const Question = require("../models/question");

router.get('/', function(req, res, next) {
    Question.find()
        .select("title text score")
        .exec()
        .then(function(docs){
            const response={
                count: docs.length,
                questions: docs.map(function(doc){
                    return {
                        _id: doc._id,
                        title : doc.title,
                        text: doc.text,
                        nbOfVotes: doc.nbOfVotes,
                        nbOfAnswers: doc.nbOfAnswers,
                        author: doc.author,
                        date: doc.date,

                        request:{
                            type: "GET",
                            url: "http://localhost:3000/questions/" + doc._id
                        }
                    }

                })
            };

                res.status(200).json(response)

        })
        .catch(function (err){
            console.log(err);
            res.status(500).json({
                error:err
            })
        });
});

router.post('/', function(req, res, next) {
    console.log(req);

    const question = new Question({

        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        text: req.body.text,
        nbOfVotes: req.body.nbOfVotes,
        nbOfAnswers: req.body.nbOfAnswers,
        author: req.body.author,
        date: new Date()

    });
    question
        .save()
        .then(function(result){
        console.log(result);
        res.status(201).json({
            message: "Created question",
            createdQuestion:{

                _id: result._id,
                title: result.title,
                text: result.text,
                nbOfVotes: result.nbOfVotes,
                nbOfAnswers: result.nbOfAnswers,
                author: result.author,
                date: result.date,
                
                request:{
                    type: "GET",
                    url: "http://localhost:3000/questions/" + result._id
                }
            }
        });
    })
        .catch(function(err){
            console.log(err);
            res.status(500).json({
                error:err
            });
        });

});

router.get('/:questionId', function(req, res, next) {
    const id = req.params.questionId;
    Question.findById(id)
        .select("title text score")
        .exec()
        .then(function(doc){
            console.log("From database", doc);
            if (doc){
                res.status(200).json({
                    question: doc,
                    request:{
                        type: "GET",
                        url: "http://localhost:3000/questions/" + doc._id
                    }
                });
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

router.patch('/:questionId', function(req, res, next) {
    const id = req.params.questionId;
    const updateOps={};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Question.update({_id : id},{$set: updateOps})
        .exec()
        .then(function(result){
            res.status(200).json({
                message: "Question updated",
                request:{
                    type: "GET",
                    url: "http://localhost:3000/questions/" + id
                }
            });
        })
        .catch(function(err){
            console.log(err);
            res.status(500).json({error:err});
        });
});

router.delete('/:questionId', function(req, res, next) {
    const id = req.params.questionId;
    Question.remove({_id : id})
        .exec()
        .then(function(result){
            res.status(200).json(result);
        })
        .catch(function(err){
            console.log(err);
            res.status(500).json({error:err});
        });
});

module.exports = router;

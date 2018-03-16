var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");

const question = require("../models/question");
const Jobs = require("../models/jobs");
/* GET home page. */
//date: new Date().toUTCString()
router.get('/', function(req, res, next) {
    question.find()
        .exec()
        .then(docs => {
            if (req.user){
                res.render('jobposting', { questions: docs, user : req.user });
            } else {
                res.render('jobposting', { questions: docs});
                }

        })
        .catch(err => {
            console.log(err);
            res.status(200).json({
                error: err
        });
    }); 
});
router.post('/', function(req, res, next) {
    var genId = new mongoose.Types.ObjectId();
    console.log(req.user);
    const jobs = new Jobs({
        _id: genId,
        title: req.body.title,
        company: req.body.company,
        link: req.body.link,
        author: req.body.author,
        date: new Date().toUTCString()
    });
    jobs
        .save()
        .then(function(result){
            res.redirect('/');      
    })
        .catch(function(err){
            console.log(err);
            res.status(500).json({
                error:err
            });
        });

});
module.exports = router;
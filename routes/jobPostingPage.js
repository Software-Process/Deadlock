const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const question = require("../models/question");
const Jobs = require("../models/jobs");
/* GET home page. */
router.get("/", function(req, res, next) {
    question.find()
        .exec()
        .then(docs => {
            if (req.user){
                res.render("jobposting", { questions: docs, user : req.user });
            } else {
                res.render("jobposting", { questions: docs});
            }

        })
        .catch(err => {
            res.status(200).json({
                error: err
            });
        }); 
});
router.post("/", function(req, res, next) {
    const genId = new mongoose.Types.ObjectId();
    console.log(req.user);
    const jobs = new Jobs({
        _id: genId,
        title: req.body.title,
        company: req.body.company,
        link: req.body.link,
        location: req.body.location,
        description: req.body.description,
        date: new Date().toUTCString()
    });
    jobs
        .save()
        .then(function(result){
            res.redirect("/");
        })
        .catch(function(err){
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
});
module.exports = router;
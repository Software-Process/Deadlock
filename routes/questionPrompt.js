const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

const Question = require("../models/question");
const User = require("../models/user");

/*To render the questionPrompt.hbs page. Redirects if user is not signed in.*/
router.get("/", function(req, res, next) {
    if (req.user) {
        res.render("questionPrompt", {user: req.user});
    } else {
        res.render("signIn");
    }
});

/* Submits a question via a POST request.*/
router.post("/", function(req, res, next) {
    const genId = new mongoose.Types.ObjectId();
    const question = new Question({
        _id: genId,
        title: req.body.title,
        text: req.body.question,
        score: 0,
        nbOfAnswers: 0,
        author: req.user._id,
        username: req.user.username,
        hasAccepted : false,
        date: new Date().toUTCString(),
        replies: [],
        tags: req.body.tag
    });
    question
        .save()
        .then(function(){
            User.update({"username": req.user.username}, {$inc : {posted: 1}}, function (){
                const path = "/question/" + genId;
                res.redirect(path);
            });

        })
        .catch(function(err){
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
});
module.exports = router;

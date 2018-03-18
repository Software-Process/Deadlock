var express = require('express');
var router = express.Router();

const question = require("../models/question");

/* GET home page. */
router.get('/', function(req, res, next) {
    question.find()
        .exec()
        .then(docs => {
            if (req.user){
                res.render('index', { questions: docs.reverse(), user : req.user });
            } else {
                res.render('index', { questions: docs.reverse()});
            }

        })
        .catch(err => {
            console.log(err);
            res.status(200).json({
                error: err
        });
    }); 
});

module.exports = router;
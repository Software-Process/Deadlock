var express = require('express');
var router = express.Router();

const question = require("../models/question");
//const Job = require("../models/jobs");
/* GET home page. */
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

module.exports = router;
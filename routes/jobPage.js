const express = require("express");
const router = express.Router();

const question = require("../models/question");
const jobs = require("../models/jobs");

/* GET home page. */
router.get("/", function(req, res, next) {
    jobs.find()
        .exec()
        .then(docs => {
            if (req.user){
                res.render("jobpage", { jobs: docs.reverse(), user : req.user });
            } else {
                res.render("jobpage", { jobs: docs.reverse(), user : req.user });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(200).json({
                error: err
        });
    }); 
});
router.get("/:jobId", function(req, res, next) {
    const id = req.params.jobId;
    jobs.findById(id)
        .exec()
        .then(docs => {
            if (req.user){
                res.render("jobdescription", { job: docs, user : req.user });
            } else {
                res.render("jobdescription", { job: docs});
                }

        })
        .catch(err => {
            res.status(200).json({
                error: err
        });
    }); 
});
module.exports = router;
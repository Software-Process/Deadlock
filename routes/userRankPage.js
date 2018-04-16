const express = require("express");
const router = express.Router();

const User =  require("../models/user");

/* GET About Us page. */
router.get("/", function(req, res, next) {
    User.find()
        .exec()
        .then(docs => {        	
            res.render("userRankPage", { user: req.user, users: docs, tagName : "Please select a tag above", tagScores: "-" });
        })
        .catch(err => {
            res.status(200).json({
                error: err
            });
        }); 
});

router.get("/:tag", function(req, res) {
    const tag = req.params.tag;	
    var fieldTag = getFieldWithTag(tag);
    var query = {};
    query[fieldTag] = { $gt: 0 };

    var querySort = {};
    querySort[fieldTag] = -1;

    User.find(query).sort(querySort)
        .exec()
        .then(docs => {
            res.render("userRankPage", { 
                user: req.user, 
                tagName : tag, 
                users: docs, 
                tagField: fieldTag, 
                showTable:"True" 
            });
        })
        .catch(err => {
            res.status(200).json({
                error: err
            });
        });
});

function getFieldWithTag(tag) {
    var property = "tag";

    switch(tag) {
    case "C++":
        property += "CPlusPlus";
        break;
    case "C#":
        property += "CSharp";
        break;
    case "Visual Basic":
        property += "VisualBasic";
        break;
    default:
        property += tag;
        break;
    }

    return property;
}


module.exports = router;
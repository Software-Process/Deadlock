var express = require('express');
var router = express.Router();

const Question = require("../models/question");
const User =  require("../models/user");

/* GET About Us page. */
router.get('/', function(req, res, next) {
	User.find()
        .exec()
        .then(docs => {
			res.render('userRankPage', { users: docs, tag : "Please select a tag above" });
        })
        .catch(err => {
            console.log(err);
            res.status(200).json({
                error: err
        });
    }); 
});

router.get('/:tag', function(req, res) {
    const tag = req.params.tag;
    var fieldTag = getFieldWithTag(tag);

    console.log("==============================");
	console.log(tag);
	console.log(fieldTag);
	console.log("==============================");
        	
    User.find()
        .then(docs => {        	
			res.render('userRankPage', { tagName: tag,  users: docs });
        })
        .catch(err => {
            console.log(err);
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
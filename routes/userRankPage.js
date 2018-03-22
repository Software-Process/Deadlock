var express = require('express');
var router = express.Router();

const Question = require("../models/question");
const User =  require("../models/user");

/* GET About Us page. */
router.get('/', function(req, res, next) {
	User.find()
        .exec()
        .then(docs => {        	
			res.render('userRankPage', { users: docs, tagName : "Please select a tag above", tagScores: "-" });
        })
        .catch(err => {
            console.log(err);
            res.status(200).json({
                error: err
        });
    }); 
});

router.get('/:tag', function(req, res) {
    const tag = req.params.tag;			//Java
    var fieldTag = getFieldWithTag(tag);	//tagJava

    console.log("==============================");
	console.log(tag);
	console.log(fieldTag);
	console.log("==============================");
        	
    User.find()
    	.exec()
        .then(docs => {
        	var tagValues = [];

        	var query = {};

        	console.log(docs); 	
        	for(var i = 0; i < docs.length; ++i) {    		
        		tagValues.push(docs[i][fieldTag]);
        	}    		

			res.render('userRankPage', { tagName : tag, users: docs, tagField: fieldTag });
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
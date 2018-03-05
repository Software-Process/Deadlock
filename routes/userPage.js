var express = require('express');
var router = express.Router();

const Question = require("../models/question");

/* GET home page. */
router.get('/', function(req, res, next) {
  	Question.find({user:'testUser'}) // To be replaced with logged in user
	  	.exec()
	  	.then(docs => {
			console.log(docs);
			res.render('userPage', { questions: docs });		
	  	})
	  	.catch(err => {
	  		console.log(err);
	  		res.status(200).json({
	  			error: err
	  	});
  	});	
});

module.exports = router;
const mongoose = require("mongoose");

/*
	Here is the characteristics for a reply
	{
		"id" : Unique identifier [Required] 
		"title" : One sentence description of question [Required]
		"text" : Main body of the question [Required]
		"nbOfVotes" : Number of votes based on user input [Set to 0]
		"nbOfAnswers" : Number of replies to the question [Set to 0]
		"user" : Username of author
		"author" : Owner of the post [Required]
		"date" : Date of submission (Automatically assigned) [Required]
	}
*/

const replySchema = mongoose.Schema({
    text: {type: String, required: true},
    score: {type: Number, required: true},
    author: {type: mongoose.Schema.Types.ObjectId, required: true}, // prefix with mongoose?
    date : {type: String, required: true},
    question: {type: mongoose.Schema.Types.ObjectId, required: true},
    accepted: {type: Boolean, required: true},
    rejected: {type: Boolean, required: true}
});

module.exports = mongoose.model("Reply", replySchema);
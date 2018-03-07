const mongoose = require("mongoose");

/*
	Here is the characteristics for a question
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

const questionSchema = mongoose.Schema({
    title: {type: String, required: true},
    text: {type: String, required: true},
    score: {type: Number, required: true},
    author: {type: mongoose.Schema.Types.ObjectId, required: true}, // prefix with mongoose?
    date : {type: String, required: true},
    answers: {type: [mongoose.Schema.Types.ObjectId]}
});

module.exports = mongoose.model("Question", questionSchema);

const mongoose = require("mongoose");

/*
	Here is the characteristics for a question
	{
		"id" : Unique identifier [Required] 
		"title" : One sentence description of question [Required]
		"text" : Main body of the question [Required]
		"nbOfVotes" : Number of votes based on user input [Set to 0]
		"nbOfAnswers" : Number of replies to the question [Set to 0]
		"author" : Owner of the post [Required]
		"date" : Date of submission (Automatically assigned) [Required]
	}
*/

const questionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String, required: true},
    text: {type: String, required: true},
    nbOfVotes: Number,
    nbOfAnswers: Number,
    author: {type: String, required: true},
    date : {type: String, required: true},
    replies : [String]
});

module.exports = mongoose.model("Question", questionSchema);

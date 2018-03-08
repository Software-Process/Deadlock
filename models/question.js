const mongoose = require("mongoose");
var Schema = mongoose.Schema;



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

const questionSchema = new Schema({
    title: {type: String, required: true},
    text: {type: String, required: true},
    score: {type: Number, required: true},
    author: {type: mongoose.Schema.Types.ObjectId, required: true},
    username: String,
    date: {type: String, required: true},
    replies: [{ type: Schema.Types.Mixed, ref: 'Reply'}]
});

module.exports = mongoose.model("Question", questionSchema);

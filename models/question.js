const mongoose = require("mongoose");
var Schema = mongoose.Schema;

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
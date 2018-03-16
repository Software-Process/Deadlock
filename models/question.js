const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const Reply = require("../models/reply");
const History = require("../models/history");

const questionSchema = new Schema({
    title: {type: String, required: true},
    text: {type: String, required: true},
    score: {type: Number, required: true},
    author: {type: mongoose.Schema.Types.ObjectId, required: true},
    username: String,
    date: {type: String, required: true},
    hasAccepted: {type: Boolean, required: true},
    replies: [Reply.schema],
    voteHistory: [History.schema]
});

module.exports = mongoose.model("Question", questionSchema);
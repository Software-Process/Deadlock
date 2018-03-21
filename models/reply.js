const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const History = require("../models/history");

const replySchema = new Schema({
    text: {type: String, required: true},
    score: {type: Number, required: true},
    author: {type: mongoose.Schema.Types.ObjectId, required: true},
    username: String,
    date :  String,
    question: mongoose.Schema.Types.ObjectId,
    accepted: {type: Boolean, required: true},
    rejected: {type: Boolean, required: true},
    voteHistory: [History.schema],
    users: [{type: String}]
});

module.exports = mongoose.model("Reply", replySchema);
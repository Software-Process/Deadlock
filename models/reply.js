const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const replySchema = new Schema({
    text: {type: String, required: true},
    score: {type: Number, required: true},
    author: {type: mongoose.Schema.Types.ObjectId, required: true},
    username: String,
    date :  String,
    question: mongoose.Schema.Types.ObjectId,
    accepted: {type: Boolean, required: true},
    rejected: {type: Boolean, required: true}
});

module.exports = mongoose.model("Reply", replySchema);
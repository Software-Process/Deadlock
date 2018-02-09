const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String, required: true},
    text: {type: String, required: true},
    score: Number
});

module.exports = mongoose.model("Question", questionSchema);

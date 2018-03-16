const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const jobs = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title : {type: String, required: true},
    company: {type: String, required: true},
    date :  String,
    link : {type: String, required: true},
    author : {type: String, required: true}
});
//date :  String,
module.exports = mongoose.model("Jobs", jobs);
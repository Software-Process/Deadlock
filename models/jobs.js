const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const jobs = new Schema({
    title : {type: String, required: true},
    company: {type: Number, required: true},
    date :  String,
    link : {type: String, required: true}
});

module.exports = mongoose.model("Jobs", jobs);
const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const historySchema = new Schema({
    user: String,
    current: Number

});

module.exports = mongoose.model("History", historySchema);
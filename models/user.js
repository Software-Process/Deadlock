var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    username: String,
    password: String, //should not be made required, as it's encrypted server side.
    email: String,
    bio: String
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    username: String,
    password: String, //should not be made required, as it's encrypted server side.
    email: String,
    bio: String,
    picture: String,
    bannerColor: String,
    phoneNumber: String,
    github: String,
    linkedin: String,
    city: String,
    country: String,
    fullName: String,
    gender: String,
    age: Number,
    birthday: String,
    spokenLanguage: String,
    programmingLanguage: String,
    questions: [
        question: question_id
    ],
    answers: [
        answers: answer_id
    ]
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
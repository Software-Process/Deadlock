var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String}, // Should not be made required, as it's encrypted server side.
    email: {type: String, required: true},
    bio: {type: String},
    picture: {type: Number, required: true},
    bannerColor: {type: String},
    phoneNumber: {type: String},
    github: {type: String},
    linkedin: {type: String},
    city: {type: String},
    country: {type: String},
    fullName: {type: String},
    gender: {type: Boolean},
    age: {type: Number},
    birthday: {type: String},
    spokenLanguage: {type: String},
    programmingLanguage: {type: String},
    questions: {type: [mongoose.Schema.Types.ObjectId]},
    answers: {type: [mongoose.Schema.Types.ObjectId]}
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
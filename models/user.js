var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String}, // Should not be made required, as it's encrypted server side.
    email: {type: String, required: true},
    admin: {type: String},
    company: {type: String},
    bio: {type: String},
    picture: {type: Number, required: true},
    bannerColor: {type: String},
    phoneNumber: {type: String},
    github: {type: String},
    linkedin: {type: String},
    city: {type: String},
    country: {type: String},
    fullName: {type: String},
    gender: {type: String},
    age: {type: Number},
    birthday: {type: String},
    spokenLanguage: {type: String},
    programmingLanguage: {type: String},
    questions: {type: [mongoose.Schema.Types.ObjectId]},
    answers: {type: [mongoose.Schema.Types.ObjectId]},
    tagJava : {type: Number},
    tagPHP : {type: Number},
    tagPython : {type: Number},
    tagCplusPlus : {type: Number},
    tagCsharp : {type: Number},
    tagRuby : {type: Number},
    tagLisp : {type: Number},
    tagProlog : {type: Number},
    tagHtml : {type: Number},
    tagCss : {type: Number},
    tagJavaScript : {type: Number},
    tagJade : {type: Number},
    tagC : {type: Number},
    tagFortran : {type: Number},
    tagVisualBasic : {type: Number},
    tagAssembly : {type: Number},
    tagPerl : {type: Number}
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
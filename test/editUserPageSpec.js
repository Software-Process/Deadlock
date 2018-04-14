const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var expect = require('chai').expect;

const testEditUserSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {type: String, required: true},
    password: {type: String},
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
    tagCPlusPlus : {type: Number},
    tagCSharp : {type: Number},
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

const testEditUser = mongoose.model('testReply', testEditUserSchema);

describe('Connecting to database for edit user page', function() {
    before(function (done) {
        mongoose.connect("mongodb://soen341:soen341@soen341-shard-00-00-ruxjj.mongodb.net:27017,soen341-shard-00-01-ruxjj.mongodb.net:27017,soen341-shard-00-02-ruxjj.mongodb.net:27017/test?ssl=true&replicaSet=SOEN341-shard-0&authSource=admin");
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function() {
            done();
        });
    });

    describe('Test edit user page', function() {
        var userID = new mongoose.Types.ObjectId();      
        var questionID = new mongoose.Types.ObjectId();
        var answerID = new mongoose.Types.ObjectId();       
        it('New user saved to test database', function(done) {
            var testFakeUser = testEditUser({
                _id: userID,
                username: 'username',
                password: 'password',
                email: 'email@gmail.com',
                admin: '',
                company: 'no',
                bio: 'bio',
                picture: 1,
                bannerColor: 'blue',
                phoneNumber: '514-123-4567',
                github: 'github',
                linkedin: 'linkedin',
                city: 'montreal',
                country: 'canada',
                fullName: 'full name',
                gender: 'male',
                age: 12,
                birthday: '2002-02-02',
                spokenLanguage: 'french',
                programmingLanguage: 'java',
                questions: questionID,
                answers: answerID,
                tagJava : 0,
                tagPHP : 0,
                tagPython : 0,
                tagCPlusPlus : 0,
                tagCSharp : 0,
                tagRuby : 0,
                tagLisp : 0,
                tagProlog : 0,
                tagHtml : 0,
                tagCss : 0,
                tagJavaScript : 0,
                tagJade : 0,
                tagC : 0,
                tagFortran : 0,
                tagVisualBasic : 0,
                tagAssembly : 0,
                tagPerl : 0
            });
            testFakeUser.save(done);
        });

        //Fail to save here

        it('Able to update bio for the user', function(done) {
            testEditUser.update({_id : userID}, {$set : {'bio' : 'new bio'}})
            .exec()
            .then(function(doc){
                //Assert that the user has successfully updated
                testEditUser.findById(userID)
                .exec()
                .then(function(doc1) {
                expect(doc1.bio).to.equal("new bio");
                    done();
                })
                .catch(function(err) {
                    console.log(err);
                    res.status(500).json({
                        error:err
                    });
                });
            })
            .catch(function(err){
                console.log(err)
                res.status(500).json({error:err})
            })
        });

        //Fail to update here

        it('Should retrieve the edited user from database', function(done) { 
            testEditUser.findById(userID)
            .exec()
            .then(function(doc){
                //Assert that we found the correct user
                testEditUser.findById(userID)
                .exec()
                .then(function(doc1) {         
                var foundId = doc1._id.toString();
                var searchId = userID.toString();
                expect(foundId).to.equal(searchId);
                    done();
                })
                .catch(function(err) {
                    console.log(err);
                    res.status(500).json({
                        error:err
                    });
                });
            })
            .catch(function(err){
                console.log(err);
                res.status(500).json({
                    error:err
                });
            });
        });

    //Fail to retrieve here
    });
  
    after(function(done){
        mongoose.connection.db.dropCollection('testreplies',function(){
            mongoose.connection.close(done);
        });
    });
});
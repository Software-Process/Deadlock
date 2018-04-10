const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var expect = require('chai').expect;
var testing = require('../routes/question');

const replySchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    text: {type: String, required: true},
    score: {type: Number, required: true},
    author: {type: mongoose.Schema.Types.ObjectId, required: true},
    username: String,
    date :  String,
    question: mongoose.Schema.Types.ObjectId,
    accepted: {type: Boolean, required: true},
    rejected: {type: Boolean, required: true},
    users: [{type: String}]
});

const reply = mongoose.model('reply3', replySchema);

const testQuestionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String, required: true},
    text: {type: String, required: true},
    score: {type: Number, required: true},
    author: {type: mongoose.Schema.Types.ObjectId, required: true},
    username: String,
    date: {type: Date, required: true},
    replies: [replySchema],
    tag: [{type: String, required: true}]
});

const questionTest = mongoose.model('questionTests', testQuestionSchema);	
	
describe('The functions in question', function() {	
    it('Verify function getPropertyWithTag with tag C++', function(){	
        expect(testing.getPropertyWithTag('C++')).to.equal('tagCPlusPlus');	
    });
    
    it('Verify function getPropertyWithTag with tag C#', function(){	
        expect(testing.getPropertyWithTag('C#')).to.equal('tagCSharp');	
    });

    it('Verify function getPropertyWithTag with tag Visual Basic', function(){	
        expect(testing.getPropertyWithTag('Visual Basic')).to.equal('tagVisualBasic');	
    });

    it('Verify function getPropertyWithTag with tag Java', function(){	
       expect(testing.getPropertyWithTag('Java')).to.equal('tagJava');	
    });	
});

describe('Database Tests for question page', function() {
    before(function (done) {
        mongoose.connect("mongodb://soen341:soen341@soen341-shard-00-00-ruxjj.mongodb.net:27017,soen341-shard-00-01-ruxjj.mongodb.net:27017,soen341-shard-00-02-ruxjj.mongodb.net:27017/test?ssl=true&replicaSet=SOEN341-shard-0&authSource=admin");
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function() {
            done();
        });
    });

    describe('Test Database', function() {
        var replyID = new mongoose.Types.ObjectId();
        var authordQuestionID = new mongoose.Types.ObjectId();
        var authorID = new mongoose.Types.ObjectId();
        var currentDate = new Date();
        var repliesSet = [];
        var questionID = new mongoose.Types.ObjectId();
        var authorIDReply = new mongoose.Types.ObjectId();

        var newReplyTest = reply({
            _id: replyID,
            text: 'text',
            score: 1,
            author: authorIDReply,
            username: 'username',
            date :  currentDate,
            question: questionID,
            accepted: false,
            rejected: false
        });

        it('New question with no replies saved to the question test database', function(done) {
            var testNewQuestion = questionTest({
                _id: authordQuestionID,
                title: 'title',
                text: 'this is a text',
                score: 1,
                author: authorID,
                username: 'username',
                date: currentDate,
                replies: repliesSet,
                tag: ["Python", "Java"]
            });
            testNewQuestion.save(done);

            //Assert it has been saved
        });

        it('Dont save incorrect title format to database', function(done) {
            var wrongSave = questionTest({
                notTitle: 'Not a title'
            });
            wrongSave.save(err => {
                if(err) { return done(); }
                throw new Error('Should generate error!');
            });
        });

        it('Able to add answers to the question', function(done) {
            questionTest.update({_id : authordQuestionID}, {$set : {'replies' : [newReplyTest]}})
            .exec()
            .then(function(doc){
              //Assert here that the question has successfully updated with replies
              done();
            })
            .catch(function(err){
                console.log(err)
                res.status(500).json({error:err})
            })
        });

        //Fail to add replies

        it('Able to test up votes for the question', function(done) {
            questionTest.update({_id : authordQuestionID}, {$set : {'score' : 2}})
            .exec()
            .then(function(doc){
              //Assert here that the question has successfully updated
              done();
            })
            .catch(function(err){
                console.log(err)
                res.status(500).json({error:err})
            })
        });

        //Fail to update the replies

        it('Able to test down votes for the question', function(done) {
            questionTest.update({_id : authordQuestionID}, {$set : {'score' : 1}})
            .exec()
            .then(function(doc){
              //Assert here that the question has successfully updated
              done();
            })
            .catch(function(err){
                console.log(err)
                res.status(500).json({error:err})
            })
        });

        //IMPORTANT!! Here modify the tests below to conform to the new way
        //You will be able to do so by questionTest.findById.then(function(doc){ doc.replies})
        //Since it is an array, I think you would need to do doc.replies[0].score 
        //Verify with the Mongo Compass if it works
        it('Should retrieve the reply from test database', function (done) {
            questionTest.find({
                replies: newReplyTest},
                (err, name) => {
                    if(err) {throw err;}
                    if(name.length === 0) { throw new Error('No data!');}
                    done();
                });
        });

        it('Able to test up votes for the reply', function(done) {
            var oldScore = {replies: newReplyTest};
            var newScore = {$set: {"replies.$.score": 2}};

            questionTest.update(oldScore, newScore, (err, name) => {
                if(err) {throw err;}
                if(name.length === 0) {throw new Error('No data!');}
                done();
            });
        });

        it('Able to test down votes for the reply', function(done) {
            var oldScore = {replies: {$elemMatch: {text: 'text'}}};
            var newScore = {$set: {"replies.$.score": 1}};

            questionTest.update(oldScore, newScore, (err, name) => {
                if(err) {throw err;}
                if(name.length === 0) {throw new Error('No data!');}
                done();
            });
        });

        it('Able to test accepting the reply', function(done) {
            var oldReply = {replies: newReplyTest};
            var newReply = {$set: {"replies.$.accepted": true}};

            questionTest.update(oldReply, newReply, (err, name) => {
                if(err) {throw err;}
                if(name.length === 0) {throw new Error('No data!');}
                done();
            });
        });

        it('Able to test rejecting the reply', function(done) {
            var oldReply = {replies: {$elemMatch: {text: 'text'}}};
            var newReply = {$set: {"replies.$.rejected": true}};

            questionTest.update(oldReply, newReply, (err, name) => {
                if(err) {throw err;}
                if(name.length === 0) {throw new Error('No data!');}
                done();
            });
        });

        it('Should retrieve the question from test database', function(done) {
            questionTest.findById(authordQuestionID)
            .exec()
            .then(function(doc){
                //Assert here
                done();
            })
            .catch(function(err){
                console.log(err);
                res.status(500).json({
                    error:err
                });
            });
        });

        //Fail to retrieve
    });
  
  after(function(done){
    mongoose.connection.db.dropCollection('questiontests', function () {
        mongoose.connection.close(done);
    });
  });
});
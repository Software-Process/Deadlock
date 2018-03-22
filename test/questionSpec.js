const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Reply = require("../models/reply");

const reply = mongoose.model('reply3', Reply.schema);

const testQuestionSchema = mongoose.Schema({
    title: {type: String, required: true},
    text: {type: String, required: true},
    score: {type: Number, required: true},
    author: {type: mongoose.Schema.Types.ObjectId, required: true},
    username: String,
    date: {type: Date, required: true},
    replies: [Reply.schema],
    tag: [{type: String, required: true}]
});

const questionTest = mongoose.model('questionTests', testQuestionSchema);
describe('Database Tests for question page', function() {
  before(function (done) {
    mongoose.connect('mongodb://soen341:soen341@soen341-shard-00-00-ruxjj.mongodb.net:27017,soen341-shard-00-01-ruxjj.mongodb.net:27017,soen341-shard-00-02-ruxjj.mongodb.net:27017/test?ssl=true&replicaSet=SOEN341-shard-0&authSource=admin');
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function() {
        done();
    });
  });

    describe('Test Database', function() {
        var authorID = new mongoose.Types.ObjectId();
        var currentDate = new Date();
        var repliesSet = [];
        var questionID = new mongoose.Types.ObjectId();
        var authorIDReply = new mongoose.Types.ObjectId();
        var newReplyTest = reply({
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

        it('Should retrieve the question from test database', function(done) {
        questionTest.find({
            title: 'title',
            text: 'this is a text',
            score: 1,
            author: authorID,
            username: 'username',
            date: currentDate,
            replies: repliesSet,
            tag: ["Python", "Java"]}, 
            (err, name) => {
                if(err) {throw err;}
                if(name.length === 0) {throw new Error('No data!');}
                done();
            });
        });

        it('Able to add replies to the question', function(done) {
            var oldReply = {author: authorID};
            var newReply = {replies: [newReplyTest]};

            questionTest.update(oldReply, newReply, (err, name) => {
                if(err) {throw err;}
                if(name.length === 0) {throw new Error('No data!');}
                done();
            });
        });

        it('Able to test up votes for the question', function(done) {
            var oldScore = {title: 'title'};
            var newScore = {score: 2};

            questionTest.update(oldScore, newScore, (err, name) => {
                if(err) {throw err;}
                if(name.length === 0) {throw new Error('No data!');}
                done();
            });
        });

        it('Able to test down votes for the question', function(done) {
            var oldScore = {title: 'title'};
            var newScore = {score: 1};

            questionTest.update(oldScore, newScore, (err, name) => {
                if(err) {throw err;}
                if(name.length === 0) {throw new Error('No data!');}
                done();
            });
        });

        it('Should retrieve question from test database', function(done) {
            questionTest.find({
                title: 'title',
                text: 'this is a text',
                score: 1,
                author: authorID,
                username: 'username',
                date: currentDate}, 
                (err, name) => {
                    if(err) {throw err;}
                    if(name.length === 0) {throw new Error('No data!');}
                    done();
            });
        });
    });
  
  after(function(done){
    mongoose.connection.close(done);
  });
});
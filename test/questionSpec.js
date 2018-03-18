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
    replies: [Reply.schema]
});

const questionTest = mongoose.model('questionTest2', testQuestionSchema);
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
    it('New question with no replies saved to the question test database', function(done) {
        var testNewQuestion = questionTest({
            title: 'title',
            text: 'this is a text',
            score: 1,
            author: authorID,
            username: 'username',
            date: currentDate,
            replies: repliesSet
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
        replies: repliesSet}, 
        (err, name) => {
            if(err) {throw err;}
            if(name.length === 0) {throw new Error('No data!');}
            done();
        });
    });

    it('Able to add replies to the question', function(done) {
        var currentDate = new Date();
        var questionID = new mongoose.Types.ObjectId();
        var authorID = new mongoose.Types.ObjectId();
        var newReply = reply({
            text: 'text',
            score: 1,
            author: authorID,
            username: 'username',
            date :  currentDate,
            question: questionID,
            accepted: true,
            rejected: false
        });

        var oldReply = {repliesSet: []};
        var newReply = {repliesSet: [newReply]};

        questionTest.update(oldReply, newReply, (err, name) => {
            if(err) {throw err;}
            if(name.length === 0) {throw new Error('No data!');}
            done();
        });
    });

    it('Able to test up votes for the question', function(done) {
        var oldScore = {score: 1};
        var newScore = {score: 2};

        questionTest.update(oldScore, newScore, (err, name) => {
            if(err) {throw err;}
            if(name.length === 0) {throw new Error('No data!');}
            done();
        });
    });

    it('Able to test down votes for the question', function(done) {
        var oldScore = {score: 2};
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
            date: currentDate,
            replies: repliesSet}, 
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
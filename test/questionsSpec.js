const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const chai = require('chai');
const expect = chai.expect;

const testSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String, required: true},
    text: {type: String, required: true},
    nbOfVotes: Number,
    nbOfAnswers: Number,
    author: {type: String, required: true},
    date : {type: String, required: true},
    replies : {
    			replyId: mongoose.Schema.Types.ObjectId,    			
    			textRep: String,
    			nbOfVotesRep: Number,
    			//replyAuthor: String,
    			accepted: Boolean
		      }
});

//Create a new collection called 'questionTest'
const questionTest = mongoose.model('questionTest', testSchema);
describe('Database Tests for questions', function() {
  before(function (done) {
    mongoose.connect('mongodb://soen341:soen341@soen341-shard-00-00-ruxjj.mongodb.net:27017,soen341-shard-00-01-ruxjj.mongodb.net:27017,soen341-shard-00-02-ruxjj.mongodb.net:27017/test?ssl=true&replicaSet=SOEN341-shard-0&authSource=admin');
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function() {
      console.log('We are connected to test database!');
      done();
    });
  });

  describe('Test Database', function() {
    it('New question saved to the question test database', function(done) {
      var testName = questionTest({
        _id: '5a9a2faaed11053a7c92964d',
        title: 'This is a title',
        text: 'Hello',
        author: 'Peter',
        date : '2018-08-08',
      });
 
      testName.save(done);
    });

    it('Dont save incorrect title format to database', function(done) {
      //Should not be able to save this item
      var wrongSave = questionTest({
        notTitle: 'Not a title'
      });
      wrongSave.save(err => {
        if(err) { return done(); }
        throw new Error('Should generate error!');
      });
    });

    it('Should retrieve data from test database', function(done) {
      //Look up the 'Mocha' object we created before
      questionTest.find({title: 'This is a title'}, (err, name) => {
        if(err) {throw err;}
        if(name.length === 0) {throw new Error('No data!');}
        done();
      });
    });

    it('Able to update title from the test database', function(done) {
      var oldTitle = {title: 'This is a title'};
      var newTitle = {title: 'This is a new title'};

      questionTest.update(oldTitle, newTitle, (err, name) => {
        if(err) {throw err;}
        if(name.length === 0) {throw new Error('No data!');}
        done();
      });
    });

    it('Should retrieve updated title from test database', function(done) {
      questionTest.find({title: 'This is a new title'}, (err, name) => {
        if(err) {throw err;}
        if(name.length === 0) {throw new Error('No data!');}
        done();
      });
    });

    it('Should delete data from the test database', function(done) {
      var testName = questionTest({
        _id: '5a9a2faaed11053a7c92964d',
        title: 'This is a new title',
        text: 'Hello',
        author: 'Peter',
        date : '2018-08-08',
      });
      questionTest.deleteOne(testName, (err, name) => {
        if(err) {throw err;}
        if(name.length === 0) {throw new Error('No data!');}
        done();
      });
    });

    it('Verify data has been deleted from test database', function(done) {
      questionTest.find({title: 'This is a new title'}, (err, name) => {
        if(err) {console.log("Deleted successfully")}
        done();
      });
    });
  });
  
  after(function(done){
      mongoose.connection.close(done);
  });
});
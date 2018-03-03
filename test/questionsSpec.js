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

//Create a new collection called 'MochaTest'
const MochaTest = mongoose.model('MochaTest', testSchema);
describe('Database Tests', function() {
  before(function (done) {
    mongoose.connect('mongodb://localhost/testDatabase');
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function() {
      console.log('We are connected to test database!');
      done();
    });
  });

  describe('Test Database', function() {
    //Save object with 'title' value of 'Mocha"
    it('New name saved to test database', function(done) {
      var testName = MochaTest({
        _id: '5a9a2faaed11053a7c92964d',
        title: 'Mocha',
        text: 'Hello',
        author: 'Peter',
        date : '2018-08-08',
      });
 
      testName.save(done);
    });

    it('Dont save incorrect format to database', function(done) {
      //Should not be able to save this item
      var wrongSave = MochaTest({
        notTitle: 'Not Mocha'
      });
      wrongSave.save(err => {
        if(err) { return done(); }
        throw new Error('Should generate error!');
      });
    });

    it('Should retrieve data from test database', function(done) {
      //Look up the 'Mocha' object we created before
      MochaTest.find({title: 'Mocha'}, (err, name) => {
        if(err) {throw err;}
        if(name.length === 0) {throw new Error('No data!');}
        done();
      });
    });

    it('Should update data from the test database', function(done) {
      var oldTitle = {title: 'Mocha'};
      var newTitle = {title: 'Latte'};

      MochaTest.update(oldTitle, newTitle, (err, name) => {
        if(err) {throw err;}
        if(name.length === 0) {throw new Error('No data!');}
        done();
      });
    });

    it('Should retrieve updated data from test database', function(done) {
      MochaTest.find({title: 'Latte'}, (err, name) => {
        if(err) {throw err;}
        if(name.length === 0) {throw new Error('No data!');}
        done();
      });
    });

    it('Should delete data from the test database', function(done) {
      var testName = MochaTest({
        _id: '5a9a2faaed11053a7c92964d',
        title: 'Latte',
        text: 'Hello',
        author: 'Peter',
        date : '2018-08-08',
      });
      MochaTest.deleteOne(testName, (err, name) => {
        if(err) {throw err;}
        if(name.length === 0) {throw new Error('No data!');}
        done();
      });
    });

    it('Verify data has been deleted from test database', function(done) {
      MochaTest.find({title: 'Latte'}, (err, name) => {
        if(err) {console.log("Deleted successfully")}
        done();
      });
    });
  });
  
  after(function(done){
    mongoose.connection.db.dropDatabase(function(){
      mongoose.connection.close(done);
    });
  });
});
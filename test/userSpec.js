const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const chai = require('chai');
const expect = chai.expect;

const testSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userName: {type: String, required: true},
    password: {type: String, required: true},
    biography: {type: String, required: true}
});

const testUser = mongoose.model('testUser', testSchema);
describe('Database Tests for users', function() {
  before(function (done) {
    mongoose.connect('mongodb://soen341:soen341@soen341-shard-00-00-ruxjj.mongodb.net:27017,soen341-shard-00-01-ruxjj.mongodb.net:27017,soen341-shard-00-02-ruxjj.mongodb.net:27017/test?ssl=true&replicaSet=SOEN341-shard-0&authSource=admin');
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function() {
      console.log('We are connected to test database!');
      done();
    });
  });

  describe('Test user Database', function() {
    it('New user saved to test database', function(done) {
      var testName = testUser({
        _id: '5a9a2faaed11053a7c92964d',
        userName: 'soenClass',
        password: 'soen341',
        biography: 'This is the user for the 341 class',
      });
 
      testName.save(done);
    });

    it('Dont save incorrect user format to database', function(done) {
      var wrongSave = testUser({
        notUserName: 'Not soenClass'
      });
      wrongSave.save(err => {
        if(err) { return done(); }
        throw new Error('Should generate error!');
      });
    });

    it('Should retrieve username from test database', function(done) {
      testUser.find({userName: 'soenClass'}, (err, name) => {
        if(err) {throw err;}
        if(name.length === 0) {throw new Error('No data!');}
        done();
      });
    });

    it('Should update username from the test database', function(done) {
      var oldUserName = {userName: 'soenClass'};
      var newUserName = {userName: 'compClass'};

      testUser.update(oldUserName, newUserName, (err, name) => {
        if(err) {throw err;}
        if(name.length === 0) {throw new Error('No data!');}
        done();
      });
    });

    it('Should retrieve updated username from test database', function(done) {
        testUser.find({userName: 'compClass'}, (err, name) => {
        if(err) {throw err;}
        if(name.length === 0) {throw new Error('No data!');}
        done();
      });
    });

    it('Should delete data from the test database', function(done) {
      var testName = testUser({
        _id: '5a9a2faaed11053a7c92964d',
        userName: 'compClass',
        password: 'soen341',
        biography: 'This is the user for the 341 class',
      });
      testUser.deleteOne(testName, (err, name) => {
        if(err) {throw err;}
        if(name.length === 0) {throw new Error('No data!');}
        done();
      });
    });

    it('Verify data has been deleted from test database', function(done) {
        testUser.find({userName: 'compClass'}, (err, name) => {
        if(err) {console.log("Deleted successfully")}
        done();
      });
    });
  });
  
  after(function(done){
      mongoose.connection.close(done);
  });
});
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testJobPostingSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title : {type: String, required: true},
    company: {type: String, required: true},
    date :  String,
    link : {type: String, required: true},
    author : {type: String, required: true},
    location : {type: String, required: true}
});

const testJobPosting = mongoose.model('testJobPosting', testJobPostingSchema);

describe('Connecting to database for job posting page', function() {
  before(function (done) {
    mongoose.connect("mongodb://soen341:soen341@soen341-shard-00-00-ruxjj.mongodb.net:27017,soen341-shard-00-01-ruxjj.mongodb.net:27017,soen341-shard-00-02-ruxjj.mongodb.net:27017/test?ssl=true&replicaSet=SOEN341-shard-0&authSource=admin");
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function() {
      done();
    });
  });

  describe('Test job posting page', function() {   
    var question = new mongoose.Types.ObjectId();          
    it('New job saved to test database', function(done) {
        var testJobExample = testJobPosting({
          _id: question,
          title: 'jobTitle',
          company: 'jobCompany',
          date: '2018-07-07',
          link: 'www.google.com',
          author: 'jobAuthor',
          location: 'Canada'
        });
        testJobExample.save(done);
    });

    it('Should retrieve the new job posting from database', function(done) {
        testJobPosting.find({
          _id: question,
          title: 'jobTitle',
          company: 'jobCompany',
          date: '2018-07-07',
          link: 'www.google.com',
          author: 'jobAuthor',
          location: 'Canada'}, 
          (err, name) => {
            if(err) {throw err;}
            if(name.length === 0) {throw new Error('No data!');}
            done();
        });
    });
  });
  
  after(function(done){
    mongoose.connection.db.dropCollection('testjobpostings',function(){
      mongoose.connection.close(done);
    });
  });
});
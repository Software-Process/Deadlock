const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testJobPageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title : {type: String, required: true},
    company: {type: String, required: true},
    date :  String,
    link : {type: String, required: true},
    author : {type: String, required: true},
    location : {type: String, required: true}
});

const testJobPage = mongoose.model('testJobPage', testJobPageSchema);

describe('Connecting to database for job page', function() {
  before(function (done) {
    mongoose.connect('mongodb://soen341:soen341@soen341-shard-00-00-ruxjj.mongodb.net:27017,soen341-shard-00-01-ruxjj.mongodb.net:27017,soen341-shard-00-02-ruxjj.mongodb.net:27017/test?ssl=true&replicaSet=SOEN341-shard-0&authSource=admin');
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function() {
      done();
    });
  });

  describe('Test job posting page', function() {   
    var question = new mongoose.Types.ObjectId();          
    it('New job saved to test database', function(done) {
        var testJobExample = testJobPage({
          _id: question,
          title: 'Developer',
          company: 'IBM',
          date: '2018-06-06',
          link: 'www.google.com',
          author: 'HR',
          location: 'Australia'
        });
        testJobExample.save(done);
    });

    it('Should be able to retrieve the new job posting from database', function(done) {
        testJobPage.find({
            _id: question,
            title: 'Developer',
            company: 'IBM',
            date: '2018-06-06',
            link: 'www.google.com',
            author: 'HR',
          location: 'Australia' },
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
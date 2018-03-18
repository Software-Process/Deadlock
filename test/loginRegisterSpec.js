const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testLoginRegisterSchema = mongoose.Schema({
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
  answers: {type: [mongoose.Schema.Types.ObjectId]}
});

const testLoginRegister = mongoose.model('testJobPosting2', testLoginRegisterSchema);

describe('Connecting to database for login register page', function() {
  before(function (done) {
    mongoose.connect('mongodb://soen341:soen341@soen341-shard-00-00-ruxjj.mongodb.net:27017,soen341-shard-00-01-ruxjj.mongodb.net:27017,soen341-shard-00-02-ruxjj.mongodb.net:27017/test?ssl=true&replicaSet=SOEN341-shard-0&authSource=admin');
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function() {
      done();
    });
  });

  describe('Test login register page', function() {
    var question = new mongoose.Types.ObjectId();
    var answer = new mongoose.Types.ObjectId();          
    it('Registers a user to test database', function(done) {
      var testLoginExample = testLoginRegister({
        username: 'toto',
        password: 'apple123',
        email: 'pie@gmail.com',
        admin: '',
        company: 'Facebook',
        bio: 'This is the facebook posting',
        picture: 2,
        bannerColor: 'red',
        phoneNumber: '514-123-3333',
        github: 'git',
        linkedin: 'linkedin',
        city: 'Montreal',
        country: 'Canada',
        fullName: 'full name',
        gender: 'male',
        age: 16,
        birthday: '1999-09-09',
        spokenLanguage: 'english',
        programmingLanguage: 'java',
        questions: question,
        answers: answer
      });
      testLoginExample.save(done);
    });

    it('Should retrieve the new user registered from database', function(done) {
        testLoginRegister.find({password: 'apple123'}, (err, name) => {
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
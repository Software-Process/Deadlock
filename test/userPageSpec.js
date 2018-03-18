const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testEditUserSchema = mongoose.Schema({
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

const testEditUser = mongoose.model('testReply3', testEditUserSchema);

describe('Connecting to database for user page', function() {
  before(function (done) {
    mongoose.connect('mongodb://soen341:soen341@soen341-shard-00-00-ruxjj.mongodb.net:27017,soen341-shard-00-01-ruxjj.mongodb.net:27017,soen341-shard-00-02-ruxjj.mongodb.net:27017/test?ssl=true&replicaSet=SOEN341-shard-0&authSource=admin');
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function() {
      done();
    });
  });

  describe('Test user page', function() {      
    var question = new mongoose.Types.ObjectId();
    var answer = new mongoose.Types.ObjectId();       
    it('New user saved to test database', function(done) {
      var testFakeUser = testEditUser({
        username: 'apple',
        password: 'pie',
        email: 'email@gmail.com',
        admin: '',
        company: 'no',
        bio: 'this is the biography',
        picture: 1,
        bannerColor: 'pink',
        phoneNumber: '514-123-4567',
        github: 'github',
        linkedin: 'linkedin',
        city: 'montreal',
        country: 'canada',
        fullName: 'full name',
        gender: 'male',
        age: 12,
        birthday: '1996-02-03',
        spokenLanguage: 'french',
        programmingLanguage: 'java',
        questions: question,
        answers: answer
      });
      testFakeUser.save(done);
    });

    it('Should retrieve the new user from database', function(done) {
      testEditUser.find({
        username: 'apple',
        password: 'pie',
        email: 'email@gmail.com',
        admin: '',
        company: 'no',
        bio: 'this is the biography',
        picture: 1,
        bannerColor: 'pink',
        phoneNumber: '514-123-4567',
        github: 'github',
        linkedin: 'linkedin',
        city: 'montreal',
        country: 'canada',
        fullName: 'full name',
        gender: 'male',
        age: 12,
        birthday: '1996-02-03',
        spokenLanguage: 'french',
        programmingLanguage: 'java',
        questions: question,
        answers: answer}, 
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
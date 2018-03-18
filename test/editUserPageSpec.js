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

const testEditUser = mongoose.model('testReply', testEditUserSchema);

describe('Connecting to database for edit user page', function() {
  before(function (done) {
    mongoose.connect('mongodb://soen341:soen341@soen341-shard-00-00-ruxjj.mongodb.net:27017,soen341-shard-00-01-ruxjj.mongodb.net:27017,soen341-shard-00-02-ruxjj.mongodb.net:27017/test?ssl=true&replicaSet=SOEN341-shard-0&authSource=admin');
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function() {
      done();
    });
  });

  describe('Test edit user page', function() {      
    var question = new mongoose.Types.ObjectId();
    var answer = new mongoose.Types.ObjectId();       
    it('New user saved to test database', function(done) {
      var testFakeUser = testEditUser({
        username: 'username',
        password: 'password',
        email: 'email@gmail.com',
        admin: '',
        company: 'no',
        bio: 'bio',
        picture: 1,
        bannerColor: 'blue',
        phoneNumber: '514-123-4567',
        github: 'github',
        linkedin: 'linkedin',
        city: 'montreal',
        country: 'canada',
        fullName: 'full name',
        gender: 'male',
        age: 12,
        birthday: '2002-02-02',
        spokenLanguage: 'french',
        programmingLanguage: 'java',
        questions: question,
        answers: answer
      });
      testFakeUser.save(done);
    });

    it('Able to update bio for the user', function(done) {
      var oldBio = {bio: 'bio'};
      var newBio= {bio: 'new bio'};
      testEditUser.update(oldBio, newBio, (err, name) => {
        if(err) {throw err;}
        if(name.length === 0) {throw new Error('No data!');}
        done();
      });
    });

    it('Should retrieve the edited user from database', function(done) {
      testEditUser.find({bio: 'new bio'}, (err, name) => {
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
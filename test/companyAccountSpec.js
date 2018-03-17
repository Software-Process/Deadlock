const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testCompanySchema = mongoose.Schema({
  username: {type: String, required: true},
  email: {type: String, required: true},
  admin: {type: String},
  company: {type: String},
  picture: {type: Number, required: true},
  bannerColor: {type: String},
});

const testCompanyAccount = mongoose.model('testCompany', testCompanySchema);
describe('Connecting to database for company account', function() {
  before(function (done) {
    mongoose.connect('mongodb://soen341:soen341@soen341-shard-00-00-ruxjj.mongodb.net:27017,soen341-shard-00-01-ruxjj.mongodb.net:27017,soen341-shard-00-02-ruxjj.mongodb.net:27017/test?ssl=true&replicaSet=SOEN341-shard-0&authSource=admin');
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function() {
      done();
    });
  });

  describe('Test company account', function() {             
    it('New company saved to test database', function(done) {
      var testCompanyExample = testCompanyAccount({
        username: 'Company username',
        email: 'company123@gmail.com',
        admin: "",
        company: "yes",
        picture: 1,
        bannerColor: '#116CF6'
      });

      testCompanyExample.save(done);
    });

    it('Should retrieve a company from test database', function(done) {
        testCompanyAccount.find({username: 'Company username'}, (err, name) => {
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
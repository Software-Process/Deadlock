const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var expect = require('chai').expect;

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
        var postingId = new mongoose.Types.ObjectId();          
        it('New job saved to test database', function(done) {
            var testJobExample = testJobPosting({
                _id: postingId,
                title: 'jobTitle',
                company: 'jobCompany',
                date: '2018-07-07',
                link: 'www.google.com',
                author: 'jobAuthor',
                location: 'Canada'
            });
            testJobExample.save(done);
        });

        //Fail to save

        it('Should retrieve the new job posting from database', function(done) {
            testJobPosting.findById(postingId)
            .exec()
            .then(function(doc){
                //Assert that we found the correct job posting
                testJobPosting.findById(postingId)
                .exec()
                .then(function(doc1) {         
                    var foundId = doc1._id.toString();
                    var searchId = postingId.toString();
                    expect(foundId).to.equal(searchId);
                    done();
                })
                .catch(function(err) {
                    console.log(err);
                    res.status(500).json({
                        error:err
                    });
                });
            })
            .catch(function(err){
                console.log(err);
                res.status(500).json({
                    error:err
                });
            });
        });

        //Fail to retrieve
    });
  
    after(function(done){
        mongoose.connection.db.dropCollection('testjobpostings',function(){
            mongoose.connection.close(done);
        });
    });
});
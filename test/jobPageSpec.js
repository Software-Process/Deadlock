const mongoose = require("mongoose");
const Schema = mongoose.Schema;	
var expect = require("chai").expect;

const testJobPageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title : {type: String, required: true},
    company: {type: String, required: true},
    date :  String,
    link : {type: String, required: true},
    author : {type: String, required: true},
    location : {type: String, required: true}
});

const testJobPage = mongoose.model("testJobPage", testJobPageSchema);

describe("Connecting to database for job page", function() {
    before(function (done) {
        mongoose.connect("mongodb://soen341:soen341@soen341-shard-00-00-ruxjj.mongodb.net:27017,soen341-shard-00-01-ruxjj.mongodb.net:27017,soen341-shard-00-02-ruxjj.mongodb.net:27017/test?ssl=true&replicaSet=SOEN341-shard-0&authSource=admin");
        const db = mongoose.connection;
        db.on("error", console.error.bind(console, "connection error"));
        db.once("open", function() {
            done();
        });
    });

    describe("Test job posting page", function() {   
        var jobID = new mongoose.Types.ObjectId();          
        it("New job saved to test database", function(done) {
            var testJobExample = testJobPage({
                _id: jobID,
                title: "Developer",
                company: "IBM",
                date: "2018-06-06",
                link: "www.google.com",
                author: "HR",
                location: "Australia"
            });
            testJobExample.save(done);
        });

        it("Should be able to retrieve the new job posting from database", function(done) {
            testJobPage.findById(jobID)
                .exec()
                .then(function(doc){
                //Assert that we found the correct job
                    testJobPage.findById(jobID)
                        .exec()
                        .then(function(doc1) {         
                            var foundId = doc1._id.toString();
                            var searchId = jobID.toString();
                            expect(foundId).to.equal(searchId);
                            done();
                        })
                        .catch(function(err) {
                            res.status(500).json({
                                error:err
                            });
                        });
                })
                .catch(function(err){
                    res.status(500).json({
                        error:err
                    });
                });
        });
    });
    
    after(function(done){
        mongoose.connection.db.dropCollection("testjobpages",function(){
            mongoose.connection.close(done);
        });
    });
});
const mongoose = require("mongoose");
const Schema = mongoose.Schema;		
var expect = require("chai").expect;

const testCompanySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {type: String, required: true},
    email: {type: String, required: true},
    admin: {type: String},
    company: {type: String},
    picture: {type: Number, required: true},
    bannerColor: {type: String},
});

const testCompanyAccount = mongoose.model("testCompany", testCompanySchema);
describe("Connecting to database for company account", function() {
    before(function (done) {
        mongoose.connect("mongodb://soen341:soen341@soen341-shard-00-00-ruxjj.mongodb.net:27017,soen341-shard-00-01-ruxjj.mongodb.net:27017,soen341-shard-00-02-ruxjj.mongodb.net:27017/test?ssl=true&replicaSet=SOEN341-shard-0&authSource=admin");
        const db = mongoose.connection;
        db.on("error", console.error.bind(console, "connection error"));
        db.once("open", function() {
            done();
        });
    });

    describe("Test company account", function() {  
        var companyID = new mongoose.Types.ObjectId();       
        it("New company saved to test database without being approved", function(done) {
            var testCompanyExample = testCompanyAccount({
                _id: companyID,
                username: "Company username",
                email: "company123@gmail.com",
                admin: "",
                company: "no",
                picture: 1,
                bannerColor: "#116CF6"
            });

            testCompanyExample.save(done);
        });

        //Here write a case to fail the save the company, can do so by forgetting to set a required variable
        //The required ones are the ones with "true"

        it("Fail to save a company due to missing required field", function(done) {
            var companyID = new mongoose.Types.ObjectId();  
            var invalidCompanyAccount = testCompanyAccount({
                _id: companyID,
                // username field is omitted for the fail test
                email: "company123@gmail.com",
                admin: "",
                company: "yes",
                picture: 1,
                bannerColor: "#116CF6"
            });

            invalidCompanyAccount.save(err => {
                if(err) { return done(); }
                throw new Error("Should generate error!");
            });
        });

        it("Able to approve the company", function(done) {
            testCompanyAccount.update({_id : companyID}, {$set : {"company" : "yes"}})
                .exec()
                .then(function(doc) {
                //Assert that the company has successfully updated
                    testCompanyAccount.findById(companyID)
                        .exec()
                        .then(function(doc1) {
                            expect(doc1.company).to.equal("yes");
                            done();
                        })
                        .catch(function(err) {
                            res.status(500).json({
                                error:err
                            });
                        });
                })
                .catch(function(err) {
                    res.status(500).json({error:err});
                });
        });

        //Here fail to approve the company, could do so by looking at an ID that does not exist

        it("Should retrieve a company from test database", function(done) {
            testCompanyAccount.findById(companyID)
                .exec()
                .then(function(doc){
                //Asserting that the question has been successfully saved to the database
                    expect(doc.picture).to.equal(1);
                    done();
                })
                .catch(function(err){
                    res.status(500).json({
                        error:err
                    });
                });
        });
    //Fail to retrieve
    });
  
    after(function(done){
        mongoose.connection.db.dropCollection("testcompanies",function(){
            mongoose.connection.close(done);
        });
    });
});
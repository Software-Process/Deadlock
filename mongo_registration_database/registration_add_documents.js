var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

//Adding mock values for the database
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj = [
      { username: 'John', password: 'Highway'},
      { username: 'Peter', password: 'Lowstreet'},
      { username: 'Amy', password: 'Apple'},
    ];
    dbo.collection("registration").insertMany(myobj, function(err, res) {
      if (err) throw err;
      console.log("Number of documents inserted: " + res.insertedCount);
      console.log(res.insertedCount);
      db.close();
    });
  });
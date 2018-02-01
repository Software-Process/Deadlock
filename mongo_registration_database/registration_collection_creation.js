var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

//Creates a collection named registration
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.createCollection("registration", function(err, res) {
    if (err) throw err;
    console.log("Collection registration created!");
    db.close();
  });
});
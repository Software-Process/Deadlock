var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

//Mock query to find data matching a password Apple
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var query = { password: "Apple" };
  dbo.collection("registration").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});
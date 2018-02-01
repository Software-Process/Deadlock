var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/soen341db";

MongoClient.connect(url, function(err, db) {
  if (err) {
  	console.log("Error creating database");
  	throw err;
  } else {
  	console.log("Database has successfully been created!");
  }  
  db.close();
});
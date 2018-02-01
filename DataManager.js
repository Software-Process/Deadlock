var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/soen341db";

MongoClient.connect(url, function(error, db) {
	if (error) {
		console.log("Error creating database");
		throw error;
	} else {
		console.log("Database has successfully been created!");
	}  

	var dbo = db.db("database");

	// Creating a collection to store data about posts
	dbo.createCollection("posts", function (error, response) {
		if (error) {
			console.log("Unable to create collection \"Posts\"");
			throw error;
		} else {
			console.log("Collection \"Posts\" has successfully been created!");			
		}
		db.close();
	});	
});
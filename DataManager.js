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

	// Creating mock post data
	var postObj = [
		{ id : 1, votes : 2, answers : 1, title : "How to run a MongoDB database?", author : "John Doe"},
		{ id : 2, votes : 5, answers : 3, title : "Where can I install Node.js?", author : "Evan Rudy"},
		{ id : 3, votes : 1, answers : 2, title : "Will Bootstrap work across all devices?", author : "Brian Wheeler"},
		{ id : 4, votes : 4, answers : 6, title : "How does the data in a database persist?", author : "Victor Hart"},
		{ id : 5, votes : 3, answers : 3, title : "Where can I find libraries for Node.js?", author : "Adam Chaffin"}
	];

	// Adding mock post data into the collection "posts"
	dbo.collection("posts").insertMany(postObj, function(error, response) {
		if (error) {
			console.log("Could not insert \"postObj\" in the collection \"posts\"");
			throw err;
		} else {
			console.log("Number of documents successfully inserted: " + response.insertedCount);
		}
		
		db.close();
	});
});
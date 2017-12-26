const MongoClient = require('mongodb').MongoClient;
const encode = require('hashcode').hashCode;
const express = require('express');
const app = express();
const link_app = process.env.LINK_APP || "localhost:1337/";
const PORT = process.env.PORT || 1337;
//const url = "mongodb://localhost:27017/urlShortener";
const url = process.env.MONGOLAB_URI;
const dbName = "urlshortener";

app.get('/new/:URL*', function(req, res) {
	var original = req.url.slice(5);
	console.log("Original URL: " + original);
	var retObj = {"original": original};
	validUrl(original, function(err) {
		if (err) {
			retObj = {err: "Invalid URL"};
			console.log("Invalid URL passed.")
		}
		else {
			MongoClient.connect(url, function(err, client) {
				if (err) throw err;
				let db = client.db(dbName);
				let collection = db.collection("originals");
				collection.findOne(retObj, function(err, result) {
					if (err) throw err;
					if (result) {
						retObj = result;
					}
					else {
						let cont;
						do {
							let digits = Math.floor(Math.random()*6+1);
							let short = Math.floor(Math.random()*1000000+1).toString().slice(0,digits);
							collection.findOne({"short": short}, function(err, result) {
								if (err) throw err;
								if (result) cont = true;
								else {
									retObj = {
										"original": original, 
										"short": link_app + short
									};
									collection.insertOne(retObj, function(err, data) {
										if (err) throw err;
										console.log("Nuevo documento insertado: " + JSON.stringify(retObj));
										client.close();
									});
									cont = false;
								}
							});
						} while(cont);
					}
				})
			});
		}
		res.json(retObj);
	});
});

app.listen(PORT, function() {
	console.log("Listening on port " + PORT);
});

// functions
function validUrl(original, callback) {
	//http://www.example.com
	let aux = original.split('://');
	if ((aux[0] != "http" && 
		aux[0] != "https") ||
		aux[1].split('.').length < 2) {
		callback(true);
	}
	else {
		callback(false);
	}
}
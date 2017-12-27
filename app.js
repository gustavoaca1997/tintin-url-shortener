// packages
const MongoClient = require('mongodb').MongoClient;
const encode = require('hashcode').hashCode;
const express = require('express');
// app
const app = express();
const PORT = process.env.PORT || 1337;
const link_app = process.env.LINK_APP || "localhost:1337/";
const url = process.env.MONGOLAB_URI;
const dbName = "urlshortener";

app.set('view engine', 'pug'); // pug

// home page
app.get('/', function(req, res) {
	res.render('index', {
		title: 'Tintin, URL Shortener Microservice',
		li1: "https://tintin.glitch.me/<short url> to access a website",
		li2: "https://tintin.glitch.me/new/<url> to get a shorter url"
	})
});

// access a website
app.get('/:url', function(req, res) {
	MongoClient.connect(url, function(err, client) {
		if (err) throw err;
		let db = client.db(dbName);
		let collection = db.collection('originals');
		collection.findOne({"short": link_app+req.params.url}, function(err, result) {
			if (err) throw err;
			if (result) {
				res.redirect(result.original);
			}
			else {
				res.send('URL not found');
			}
			client.close();
		});
	});
});

// get a shorter url
app.get('/new/:URL*', function(req, res) {
	var original = req.url.slice(5);
	console.log("Original URL: " + original);
	var retObj = {"original": original};
	validUrl(original, function(err) {
		if (err) {
			retObj = {err: "Invalid URL"};
			console.log("Invalid URL passed.")
			res.json(retObj);
		}
		else {
			MongoClient.connect(url, function(err, client) {
				if (err) throw err;
				let db = client.db(dbName);
				let collection = db.collection("originals");
				collection.find(retObj, {projection: {_id: 0}}).toArray(function(err, result) {
					if (err) throw err;
					if (result.length > 0) {
						retObj = result[0];
						res.json(retObj)
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
										"short": link_app+short
									};
									//console.log("retObj: " + JSON.stringify(retObj));
									collection.insertOne(retObj, function(err, data) {
										if (err) throw err;
										delete retObj._id;
										res.json(retObj);
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
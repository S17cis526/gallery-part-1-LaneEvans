"use strict";

/**
 * server.js
 * This file defines the server for a
 * simple photo gallery web app.
 */
 
var http = require('http');
var fs = require('fs'); // library to access the file system
var port = 3165;

var chess = fs.readFileSync('images/chess.jpg');

function serveImage(filename, req, res) {
	fs.readFile('images/' + filename, function(err, body){
		if(err){
			console.error(err);
			res.statusCode = 500;
			res.statusMessage = "Server Error";
			res.end("Server Error");
			return;
		}
		res.setHeader("Content-Type", "image/jpeg");
		res.end(body);
	}
	);
}

var server = http.createServer(function(req, res){
	switch(req.url) {
		case "/chess":
			serveImage('chess.jpg', req, res);
			break;
		case "/fern":
		case "/fern.jpg":
		case "/fern.jpeg":
			serveImage('fern.jpg', req, res);
			break;
		default:
			res.statusCode = 404;
			res.statusMessage = "Not found";
			res.end("Not Found");
	}
});

server.listen(port, function(){
	console.log("Listening on Port " + port);
});
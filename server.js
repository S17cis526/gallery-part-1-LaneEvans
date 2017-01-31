"use strict";

/**
 * server.js
 * This file defines the server for a
 * simple photo gallery web app.
 */

var http = require('http');
var fs = require('fs'); // library to access the file system
var port = 3165;
var imageNames = ['ace.jpg', 'fern.jpg', 'chess.jpg', 'mobile.jpg', 'bubble'];
var stylesheet = fs.readFileSync('gallery.css');

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
    case "/gallery":
      var gHtml = imageNames.map(function(fileName){
        return '<image src="' + fileName + '" alt="a fishing ace at work">'
      }).join('');
      var html = '<!doctype html>';
          html += '<head>';
          html += '  <title>Gallery</title>';
          html += '  <link href="gallery.css" rel="stylesheet" type="text/css">';
          html += '</head>';
          html += '<body>';
          html += '  <h1>Gallery</h1>';
          html += gHtml;
          html += '  <h1>Hello</h1> Time is ' + Date.now();
          html += '</body>';
      res.setHeader('Content-Type', 'text/html');
      res.end(html);
      break;
    case "/chess":
			serveImage('chess.jpg', req, res);
			break;
		case "/fern":
		case "/fern.jpg":
		case "/fern.jpeg":
			serveImage('fern.jpg', req, res);
			break;
    case '/ace.jpg':
      serveImage('ace.jpg', req, res);
      break;
    case '/gallery.css':
      res.setHeader('Content-Type', 'text/css');
      res.end(stylesheet);
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

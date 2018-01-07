require('dotenv').config();
var express = require('express');
//var http = require('http').Server(app);
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var mongo = require('mongodb');
path = require('path');
var app = express();
var http = require('http').Server(app);
global.appDir = path.dirname(require.main.filename);
var auth = require('./lib/auth')();

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/users", {useMongoClient: true});
var db = mongoose.connection;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended:true
}));


/* Defining middleware */
app.use(function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'content-type');
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});

app.use(function(req, res, next) {
	next();
});

/* loading all routes */
try {
    require('./routesLoder')(app, http);
} catch (error) {
    console.log('error', error);
}

app.listen(8081, function(request, response) {
	console.log("running at port: 8081");
});

//module.exports = app;

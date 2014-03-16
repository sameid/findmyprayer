var express = require('express');
var location = require('./location.js')
var http = require('http');

var app = express();
app.configure(function () {
    app.use(express.logger('dev'));
   	//app.use(express.json());
    //app.use(express.urlencoded());
    app.use(express.bodyParse());
});

app.get('/location', location.findByLocation);
app.get('/location', location.findAll);
app.get('/location/:publicId', location.find);
app.post('/location', location.create);
app.put('/location/:publicId', location.edit);
app.delete('/location/:publicId', location.del);

app.listen(8080);
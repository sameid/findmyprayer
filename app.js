var express = require('express');
var location = require('./location.js')
var http = require('http');

var app = express();
app.configure(function () {
    app.use(express.urlencoded())
	app.use(express.json())
});

app.post('/api/1/location', location.findAllByLocation);
app.get('/api/1/location', location.findAll);
app.get('/api/1/location/:publicId', location.find);
app.post('/api/1/location', location.create);
app.put('/api/1/location/:publicId', location.update);
app.delete('/api/1/location/:publicId', location.remove);


app.listen(3000);
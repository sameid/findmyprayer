var async = require ('async')
var utils = require ('./utils.js');

/*

var genericModel = {
	address: '391 Burnhamthorpe Road East',
	city: 'Oakville',
	state: 'ON',
	postal: 'L6H7B4',
	name: 'Al Falah Islamic Centre',
	longitude: -79.738101,
	latitude: 43.501917
}

*/

var db;
utils.connectToDatabase(function (dbConnection){
    db = dbConnection;
    db.collection('locations', {safe:true}, function(err, collection) { if (err) populateDB(); });  
});

exports.findAllByLocation = function(req, res){
	console.log(req.body);
	var longitude1 = req.body.longitude;
	var latitude1 = req.body.latitude;
	var rad = req.body.radius;
	if (typeof(rad) == 'undefined') rad = 10;
	if (typeof(longitude1) == 'undefined' || typeof(latitude1) == 'undefined'){
	 	res.send(403, {
			error: 'invalid data on payload'
		});
	}


	db.collection('locations' , function (err, collection){
		collection.find().toArray(function (err, items){
			var ritems = [];
			async.each (items,
				function(item, done){
					var d = distance (latitude1, longitude1, item.latitude, item.longitude, 'K');
					console.log(d)
					if (d < rad) {
						ritems.push(item);
						done();
					}
				},

				function(err){
					return res.send(200, ritems);

				}

			);
		});
	});
}

exports.findAll = function(req, res){
	db.collection('locations' , function (err, collection){
		collection.find().toArray(function (err, items){
			res.send(200, items);
		});
	});
}

exports.find = function (req, res){
	var _id = req.params.publicId
	db.collection ('locations', function(err, collection){
		collection.findOne({publicId: _id}, function(err, item){
			if (err) res.send(500, {error:'there was a db error'});
			else res.send(200, item);
		});
	});
}

exports.create = function(req, res){
	var location = req.body
	db.collection('locations', function (err, collection){
		collection.insert(location, {safe:true}, function(err, result){
			if (err) res.send(500, {error:'there was a db error'});
			else res.send(result[0]);
		});
	});
}

exports.remove = function (req, res){
	var _id = req.params.publicId
	db.collection('locations', function (err, collection){
		collection.remove({publicId:_id}, {safe:true}, function(err, result){
			if (err) res.send(500, {error:'there was a db error'});
			else res.send(result[0]);
		});
	});
}

exports.update = function (req, res){
	var _id = req.params.publicId
	var location = req.body
	db.collection('locations', function (err, collection){
		collection.update({publicId:_id},location, {safe:true}, function(err, result){
			if (err) res.send(500, {error:'there was a db error'});
			else res.send(result[0]);
		});
	});
}

function distance(lat1, lon1, lat2, lon2, unit) {
	var radlat1 = Math.PI * lat1/180
	var radlat2 = Math.PI * lat2/180
	var radlon1 = Math.PI * lon1/180
	var radlon2 = Math.PI * lon2/180
	var theta = lon1-lon2
	var radtheta = Math.PI * theta/180
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist)
	dist = dist * 180/Math.PI
	dist = dist * 60 * 1.1515
	if (unit=="K") { dist = dist * 1.609344 }
	if (unit=="N") { dist = dist * 0.8684 }
	return dist
} 

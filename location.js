var async = require ('async')
var utils = require ('./utils.js');

/*

var genericModel = {
	address: '391 Burnhamthorpe Road East',
	city: 'Oakville',
	state: 'ON',
	postal: 'L6H7B4',
	name: 'Al Falah Islamic Centre',
	logitude: 00.999999,
	latitude: 00.999999
}

*/

var db;
utils.connectToDatabase(function (dbConnection){
    db = dbConnection;
    db.collection('locations', {safe:true}, function(err, collection) { if (err) populateDB(); });  
});

exports.findAllByLocation = function(req, res){
	var lon1 = req.params.longitude;
	var lat1 = req.params.latitude;
	var rad = req.params.radius;
	if (typeof(rad) == 'undefined') rad = 1;

	db.collection('locations' , function (err, collection){
		collection.find().toArray().function (err, items){
			var ritems = [];
			async.each (items,
				
				function(item, callback){
					if (cd (lon1, lan1, item.longitude, item.latitude) < rad) {
						ritems.push(item);
						callback();
					}
				},

				function(err){
					res.send(200, ritems);
				}
			);
			
		}
	});
}

exports.findAll = function(req, res){
	db.collection('locations' , function (err, collection){
		collection.find().toArray().function (err, items){
			res.send(200, items);
		}
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
		})
	})

}

exports.del = function (req, res){
	var _id = req.params.publicId
	db.collection('locations', function (err, collection){
		collection.remove({publicId:_id}, {safe:true}, function(err, result){
			if (err) res.send(500, {error:'there was a db error'});
			else res.send(result[0]);
		})
	})

}

exports.update = function (req, res){
	var _id = req.params.publicId
	var location = req.body
	db.collection('locations', function (err, collection){
		collection.update({publicId:_id},location, {safe:true}, function(err, result){
			if (err) res.send(500, {error:'there was a db error'});
			else res.send(result[0]);
		})
	})

}

function cd (lon1, lat1, lon2, lat2){
	var R = 6371; // km
	var dLat = (lat2-lat1).toRad();
	var dLon = (lon2-lon1).toRad();
	var lat1 = lat1.toRad();
	var lat2 = lat2.toRad();

	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c;
	return d;

}
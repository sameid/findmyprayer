var ENVIRONMENT = require('./config.js').ENVIRONMENT;
var mongo = require('mongodb');
var db = ''; 

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

exports.connectToDatabase = function (callback) {
    var server = new Server(ENVIRONMENT.mongo.host, ENVIRONMENT.mongo.port, {
        auto_reconnect: true
    });
    db = new Db(ENVIRONMENT.mongo.name, server);
    db.open(function (err, db) {
        db.authenticate(ENVIRONMENT.mongo.user, ENVIRONMENT.mongo.pass, function(err, success){
            if(!err) {
                console.log("Connected to " +ENVIRONMENT.mongo.name+ " database from utils");
                callback(db);
            }
        });
    });
}


// var Server = mongo.Server,
//     Db = mongo.Db,
//     BSON = mongo.BSONPure;

// var server = new Server(ENVIRONMENT.host, ENVIRONMENT.port, {auto_reconnect: true});
// db = new Db(ENVIRONMENT.name, server, {safe: true});

// db.open(function(err, db) {
//     db.authenticate(ENVIRONMENT.user, ENVIRONMENT.pass, function(err, success){
//         if(!err) {
//             db.collection('clients', {safe:true}, function(err, collection) {
//                 if (err) {
//                     console.log("- creating clients collection");
//                     populateDB();
//                 }
//             });
//         }
//     });
// });
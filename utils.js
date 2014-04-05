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

        if (err) console.log(err);
        db.authenticate(ENVIRONMENT.mongo.user, ENVIRONMENT.mongo.pass, function(err, success){
            if(!err) {
                console.log("Connected to " +ENVIRONMENT.mongo.name+ " database from utils");
                callback(db);
            }
        });
    });
}

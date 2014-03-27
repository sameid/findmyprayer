/*constants
Heroku Login
Username: sameid.usmani@gmail.com
Passwords: Samusm12

MongoLab Creds:

Host: ds049598.mongolab.com
Name: heroku_app18619346
Username: icccms
Password: icccms
Port: 49598*/
var url = require('url');
var ru = "redis://redistogo:8b01ff5072e14ecbf915c7f6a2cc1a90@crestfish.redistogo.com:10719/";
var redisUrl = url.parse(ru);
var redisAuth = redisUrl.auth.split(':');
console.log(redisUrl);
console.log(redisAuth);

var PRODUCTION = {
	mongo: {
		host: "ds049598.mongolab.com",
		name: "heroku_app18619346",
		user: "icccms",
		pass: "icccms",
		port: 49598
	},
	redis: {
		host: "crestfish.redistogo.com",
		port: 10719,
		db: "redistogo",
		pass: "8b01ff5072e14ecbf915c7f6a2cc1a90",

	}
}

var DEVELOPMENT = {
	mongo: {
		host: "127.0.0.1",
		name: "findmyprayer",
		user: "admin",
		pass: "d4t4b4s3",
		port: 27017
	},
	redis: {
		host: "127.0.0.1",
		port: 6379
	}
}

exports.ENVIRONMENT = DEVELOPMENT;

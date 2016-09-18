'use strict';

const config = global.config;
let mongoose = require("mongoose");
mongoose.Promise = require('q').Promise;
let session = require('koa-generic-session');
let MongoStore = require('koa-generic-session-mongo');



module.exports = function(){

	let settings = config.get('sso');
	let mongooseConnection = mongoose.createConnection(config.get('mongoose:SSOUri'),
		config.get('mongoose:SSOOptions'));

	let store = new MongoStore({
		host: mongooseConnection.host,
		port: mongooseConnection.port,
		user: mongooseConnection.user,
		password: mongooseConnection.password,
		db: mongooseConnection.name
	});

	return session({
			secret: settings.secret,
			key: settings.key,
			prefix: 'Admin:sessions:',
			cookie: settings.cookie,
			resave: false,
			saveUninitialized: true,
			store: store
	})

};


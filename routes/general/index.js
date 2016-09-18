'use strict';
const Router = require('koa-router');
const SSO = require("@anzuev/studcloud.sso");
const send = require('koa-send');
const fs = require('mz/fs');
const Admin = require(global.appRoot + 'models/admin').Admin;


let generalRouter = new Router();



generalRouter.get('/', function*(){

	if(this.session.user){
		let user = yield* Admin.getById(this.session.user);
		yield this.render("lk.html", {
			host: global.config.get('host'),
			name: user.auth.login
		});
	}else{
		yield this.render("login.html", {
			host: global.config.get('host')
		});
	}

});


module.exports = generalRouter;
'use strict';
const Admin = require(global.appRoot + 'models/admin').Admin;


function* logout(next){
	this.session.user = null;
	this.response.status = 200;
}
module.exports = logout;

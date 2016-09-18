'use strict';
const Admin = require(global.appRoot + 'models/admin').Admin;


function* preLogin(next){

	let login = this.request.body.login;
	let password = this.request.body.password;


	if(!(login&& password)){
		throw new global.ValidationError(400, "Not enough data to process signIn");
	}
	let result = yield* Admin.signIn(login, password);
	if(result){
		let admin = yield* Admin.getByLogin(login);
		this.session = this.session || {};
		this.session.user = admin._id;

		this.body = admin;
	}else{
		throw new global.AuthError(401, "Incorrect mail or password");
	}

}
module.exports = preLogin;

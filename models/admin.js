'use strict';


const crypto  = require('crypto');
const connection = require('../libs/adminDBMongoose'),
	mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const util = require('util');



let Admin = new Schema({
    auth: {
        login:{
            require: true,
            type: String,
            unique: true
        },
        hashed_password:{
            type:String,
            require: true
        },
        salt:{
            type:String,
            require: true
        }
    },
	role:{
		type:String,
		default: "view"
	}
},
	{
		collection: 'admins'
	});



Admin.methods.encryptPassword = function(password){
    return crypto.createHmac('sha1',this.auth.salt).update(password).digest("hex");
};

Admin.virtual('auth.password')
    .set(function(password) {
        this.auth._plainPassword = password;
        this.auth.salt = Math.random() + "";
        this.auth.hashed_password = this.encryptPassword(password);
    })
    .get(function() { return this._plainPassword;} );

Admin.methods.checkPassword = function(password){
    return (this.encryptPassword(password) === this.auth.hashed_password);
};


/**
 * signIn
 * @function signIn
 * @param login
 * @param password
 * @returns {*}
 */
Admin.statics.signIn = function*(login, password){
    let User=this;
	let user =  yield User.findOne({"auth.login": login}).exec();

	if(user){
		return user.checkPassword(password);
	}

	return false;
};

Admin.statics.addAdmin = function*(login, password){
	let newAdmin = new this({
		auth:{
			login: login,
			password: password
		}
	});

	return yield newAdmin.save();
};

Admin.statics.setRole = function*(requesterLogin, login, role){
	var Admin = this;

	let admin = yield Admin.findOne({"auth.login": requesterLogin}).exec();

	if(admin.role != "all"){
		throw new ValidationError(403, "Not permitted");
	}else{
		let updated = Admin.update({"auth.login": login}, {role: role}).exec();
		return (updated.nModified == 1);
	}
};

Admin.statics.grantAllRights = function*(login){
	yield this.update({"auth.login": login}, {role: "all"}).exec();
};

Admin.statics.getById = function*(id){
	return yield this.findById(id).exec();
}


Admin.statics.getByLogin = function*(login){
	return yield this.findOne({"auth.login": login}).exec();
}

exports.Admin = connection.model('Admin', Admin);





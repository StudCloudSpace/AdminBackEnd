'use strict';

let Admin = require("./models/admin").Admin;
let Q = require("q");

/*Admin.addAdmin("GPopov", "adminPWD", function(err, result){
	console.log(arguments)
});*/

/*Admin.grantAllRights("AnZuev", function(err, res){
	console.log(arguments);
})*/


Q.async(function*(){
	let result = yield* Admin.addAdmin("JPolushina", "password");
	console.log(result);
})().done();

/*Admin.setRole("AnZuev", "GPopov", "so-so", function(err, res){
	console.log(arguments);
});*/

'use strict';

let path = require('path');
global.appRoot = path.resolve(__dirname)+ '/';

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const koaJsonLogger = require('koa-json-logger');
const handlebars = require("koa-handlebars");



global.SSO = require('@anzuev/studcloud.sso');
global.RDS = require("@anzuev/studcloud.rds");
global.UAMS = require("@anzuev/studcloud.uams");
global.ValidationError = require("@anzuev/studcloud.errors").ValidationError;
global.AuthError = require("@anzuev/studcloud.errors").AuthError;
global.DbError = require("@anzuev/studcloud.errors").DbError;
global.config = require(appRoot + '/config');


let app = Koa();

RDS.configure(config);
UAMS.configure(config);

app.use(require('./libs/sessions')());

app.use(require('koa-static')(global.appRoot + '/public', {}));

app.use(function*(next){
	try{
		this.set("Access-Control-Allow-Origin", '*');
		this.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
		yield next;
	}catch(err){
		//throw err;
		if(err instanceof ValidationError){
			this.response.status = err.code;
		}if(err instanceof AuthError){
			this.response.status = err.code;
		}if(err instanceof DbError){
			this.response.status = err.code;
		}else{
			this.response.status = 500;
		}
	}
	console.log("%s %s - %s", this.method, this.url, this.status);

});

app.use(function*(next){
	if(this.method == "OPTIONS"){
		this.body = "";
	}else{
		yield next;
	}

});

app.keys = config.get('sso:keys');



app.use(bodyParser());


app.use(handlebars({
	extension:   ['html', 'handlebars'],
	partialsDir: 'frontend/partials',
	viewsDir: "frontend/views",
	cache: false
}));

require("./routes")(app);


module.exports = app;

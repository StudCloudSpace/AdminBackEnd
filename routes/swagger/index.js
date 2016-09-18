'use strict';
const Router = require('koa-router');
const swaggerJSDoc = require('swagger-jsdoc');
const fs = require('mz/fs');
const path = require('path');


// создаем новый роутер
let swaggerRouter = new Router();


var options = {
	swaggerDefinition: {
		info: {
			title: 'StudCloud - Admin',
			version: '1.0.0',
			description: "API for StudCloud.Admin"
		},
		host: require(appRoot + "config").get('bin:host') + ":" + require(appRoot + "config").get('bin:port'),
		basePath: '/'
	},
	apis: [appRoot + 'routes/authorize/**/*.js', appRoot + 'routes/users/**/*.js', appRoot + 'routes/staticData/subjects/**/*.js',
		appRoot + 'routes/staticData/universities/**/*.js']

};

let swaggerSpec = swaggerJSDoc(options);
swaggerSpec.definitions.Error = require('./jsonDefinitions/Error.json');
swaggerSpec.definitions.newUsersStat = require('./jsonDefinitions/newUsersStat.json');
swaggerSpec.definitions.subjectItem = require('./jsonDefinitions/subjectItem.json');
swaggerSpec.definitions.facultyItem = require('./jsonDefinitions/FacultyItem.json');
swaggerSpec.definitions.universityItem = require('./jsonDefinitions/UniversityItem.json');



/**
 * @swagger
 * /api.json:
 *   get:
 *     tags:
 *       - Swagger
 *     description: Returns api.json file
 *     produces:
 *       - application/json
 *     parameters:
 *     responses:
 *       200:
 *         description: Api.json file
 *       404:
 *         description: file not found
 *         schema:
 *           $ref: "#/definitions/Error"
 */
swaggerRouter.get('/api.json', function*(next){
	this.body = swaggerSpec;
	yield next;
});

swaggerRouter.get('/swagger', function*(next){
	this.body = yield fs.readFile(path.resolve('frontend/views/swagger.html'));
	this.set('Content-Type', 'text/html');
	yield next;
});

module.exports = swaggerRouter;
'use strict';
const Router = require('koa-router');
const RDS = require("@anzuev/studcloud.rds");

// создаем новый роутер
let subRouter = new Router();

// добавляем префикс
subRouter.prefix("/api/subjects");

subRouter.post('/addSubject', require("./handlers/addSubject"));

subRouter.post('/enable', require("./handlers/activate"));

subRouter.post('/disable', require("./handlers/deactivate"));

subRouter.post('/setTitle', require("./handlers/changeName"));

subRouter.get('/getAllSubjects', require("./handlers/getAllSubjects"));

subRouter.get('/getEnabled', require("./handlers/getEnabled"));


//экспорт роутера
module.exports = subRouter;
'use strict';
const Router = require('koa-router');

// создаем новый роутер
let wtRouter = new Router();

wtRouter.prefix("/api/workTypes");


wtRouter.post('/addType', require("./handlers/addType"));


wtRouter.post('/enable', require("./handlers/activate"));


wtRouter.post('/disable', require("./handlers/deactivate"));


wtRouter.post('/setName', require("./handlers/setName"));


wtRouter.get('/isExist', require("./handlers/isExist"));


wtRouter.get('/getAll', require("./handlers/getAll"));

wtRouter.get('/getById', require("./handlers/getById"));

wtRouter.get('/getEnabled', require("./handlers/getEnabled"));


wtRouter.get('/getDisabled', require("./handlers/getDisabled"));

//экспорт роутера
module.exports = wtRouter;
'use strict';
const Router = require('koa-router');

// создаем новый роутер
let univerRouter = new Router();

// добавляем префикс
univerRouter.prefix("/api/universities");

// обычная обработка запроса


univerRouter.post('/addUniversity', require("./handlers/addUniversity"));


univerRouter.post('/addFaculty', require("./handlers/addFaculty"));


univerRouter.get('/getUniversities', require("./handlers/getUniversities"));

univerRouter.post('/removeUniversity', require('./handlers/removeUniversity'));

univerRouter.post('/updateFaculty', require('./handlers/updateFacultyTitle'));

univerRouter.post('/updateUniversity', require('./handlers/updateUniversity'));

univerRouter.get('/getFaculties', require("./handlers/getFaculties"));



module.exports = univerRouter;
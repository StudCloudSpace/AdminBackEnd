'use strict';
const Router = require('koa-router');


let usersRouter = new Router();


usersRouter.prefix('/api/users');

usersRouter.get('/getNewUsers', require('./handlers/getNewUsers'));

usersRouter.get('/getNewUsersStat', require('./handlers/getNewUsersStat'));

usersRouter.get('/getUsersPerUniversity', require('./handlers/getUserStaticsPerUniversity'));


module.exports = usersRouter;
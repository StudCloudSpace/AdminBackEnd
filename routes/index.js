'use strict';

/*
	при подключении этого файла навешиваются все обработчики запросов
	app.use(Router router.routes()); - подключение конкретного роутера
 */
module.exports = function(app){

	app.use(require("./general").routes());
	app.use(require("./authorize").routes());
	app.use(require("./users").routes());
	//app.use(require("./documents/index").routes());
	app.use(require("./staticData/subjects/index").routes());
	app.use(require("./staticData/universities/index").routes());
	app.use(require("./staticData/workTypes/index").routes());
	app.use(require("./swagger/index").routes());

};
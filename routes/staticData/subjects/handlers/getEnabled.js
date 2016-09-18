'use strict';
const SI = global.RDS.getSubjectModel();
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;



/**
 * @swagger
 * /api/subjects/getEnabled:
 *   get:
 *     tags:
 *       - Subjects
 *     description: Получить активированные предметы(доступные для поиска пользователям)
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: search
 *         type: string
 *         required: false
 *         in: query
 *         description: Строка поиска(названию)
 *       - name: skip
 *         type: string
 *         required: false
 *         in: query
 *         description: Номер страницы(0 - первая, 1-вторая и тд)
 *     responses:
 *       200:
 *         description: Найденные предметы
 *         schema:
 *           type: array
 *           items:
 *              $ref: '#/definitions/subjectItem'
 *       204:
 *         description: Не найдено предметов
 *       400:
 *         description: some error, watch description
 *         schema:
 *            $ref: '#/definitions/Error'
 */

module.exports = function*() {
    try{
	    let search = this.request.query.search || "";
	    let skip = this.request.query.skip;
	    console.log(search);
	    let res = yield SI.getEnabled(search,skip);
	    this.body = res;
    }catch(err){
	    if(err.code == 204){
		    this.response.status = 204;
	    }else{
		    throw err;
	    }
    }

};
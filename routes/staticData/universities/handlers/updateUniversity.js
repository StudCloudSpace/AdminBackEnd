'use strict';
const UI = global.RDS.getUniversityModel();
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;


/**
 * @swagger
 * /api/universities/updateUniversity:
 *   post:
 *     tags:
 *       - Universities
 *     description: Update university title
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: universityId
 *         in: formData
 *         description: id универа
 *         type: string
 *         required: true
 *       - name: shortTitle
 *         in: formData
 *         description: Краткое название
 *         type: string
 *         required: false
 *       - name: title
 *         in: formData
 *         description: Полное название
 *         type: string
 *         required: false
 *     responses:
 *       200:
 *         description: Название изменено
 *         schema:
 *            type: object
 *            properties:
 *               result:
 *                  type: boolean
 *                  description: Результат выполнения
 *       400:
 *         description: creation failed
 *         schema:
 *            $ref: '#/definitions/Error'
 */
module.exports = function*() {

	let obj = {
		title: this.request.body.title,
		shortTitle: this.request.body.shortTitle
	} ;

	let universityId;
	try{
		universityId = this.request.body.universityId;
	}catch(err){
		throw new ValidationError(400, "Bad universityId");
	}

	let result = yield* UI.updateTitles(universityId, obj);

	this.body = {result: result};
};
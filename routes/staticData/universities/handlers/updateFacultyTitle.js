'use strict';
const UI = global.RDS.getUniversityModel();
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;


/**
 * @swagger
 * /api/universities/updateFaculty:
 *   post:
 *     tags:
 *       - Universities
 *     description: Update faculty title
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
 *       - name: facultyId
 *         in: formData
 *         description: id университета
 *         type: number
 *         required: true
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

	let facultyId;
	let universityId;
	try{
		facultyId = this.request.body.facultyId;
		universityId = this.request.body.universityId;
	}catch(err){
		throw new ValidationError(400, "Bad facultyId or universityId");
	}

	let result = yield* UI.updateFacultyTitles(universityId, facultyId, obj);

	this.body = {result: result};

};
'use strict';
const UI = global.RDS.getUniversityModel();
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;
const Mongoose = require('mongoose');

/**
 * @swagger
 * /api/universities/removeUniversity:
 *   post:
 *     tags:
 *       - Universities
 *     description: Remove special university
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: formData
 *         description: university id
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Университет успешно удален
 *         schema:
 *            type: object
 *            properties:
 *               result:
 *                  type: boolean
 *                  description: Результат выполнения
 *       404:
 *         description: Не найден университет по id
 *         schema:
 *            $ref: '#/definitions/Error'
 */
module.exports = function*() {
	let id = this.request.body.id;
	try{
		id = Mongoose.Types.ObjectId(id);
	}catch(err) {
		throw new ValidationError(400, "Bad university id passed in id param");
	}
	let res = yield* UI.removeById(id);
	this.body = {result: res};
};
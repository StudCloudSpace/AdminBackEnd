'use strict';
const WI = RDS.getWorkTypeModel();
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;
const Mongoose = require('mongoose');


/**
 * @swagger
 * /api/workTypes/getById:
 *   get:
 *     tags:
 *       - WorkTypes
 *     description: Get by id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: query
 *         description: workType's id
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: workType item
 *         schema:
 *            $ref: '#/definitions/workTypeItem'
 *       400:
 *         description: Bad id passed
 *         schema:
 *            $ref: '#/definitions/Error'
 *       404:
 *         description: no workType found by id
 *         schema:
 *            $ref: '#/definitions/Error'
 */
module.exports = function*() {
	let id = this.request.query.id;
	try{
		id = Mongoose.Types.ObjectId(id);
	}catch (err){
		throw new ValidationError(400, "Bad id passed");
	}
	this.body = yield WI.getById(id);
};
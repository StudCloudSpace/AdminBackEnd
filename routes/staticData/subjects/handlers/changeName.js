'use strict';
const RDS = require('@anzuev/studcloud.rds');
const SI = RDS.getSubjectModel();
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;
const Mongoose = require('mongoose');


/**
 * @swagger
 * /api/subjects/setTitle:
 *   post:
 *     tags:
 *       - Subjects
 *     description: Set new title to subject
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         type: string
 *         required: true
 *         in: formData
 *         description: Subject's id
 *       - name: newTitle
 *         type: string
 *         required: true
 *         in: formData
 *         description: new title for subject
 *     responses:
 *       200:
 *         description: New title has been setted
 *         schema:
 *           type: object
 *           properties:
 *              result:
 *                 type: boolean
 *                 description: Operation result, true - new title has been setted, otherwise false;
 *       400:
 *         description: some error, watch description
 *         schema:
 *            $ref: '#/definitions/Error'
 */
module.exports = function*() {
	let id;
	let newTitle;
	try {
		id = Mongoose.Types.ObjectId(this.request.body.id);
		newTitle = id;
	}catch (err){
		throw new ValidationError(400, "Incorrect id");
	}

	if(newTitle.length < 2){
		throw new ValidationError(400, "Title must be at least 2 chars");
	}

	let res = yield SI.setName(id, newTitle);

	if (res == null){
		throw new ValidationError(404, "No such subject");
	} else{
		this.body = {result: true};
	}
};
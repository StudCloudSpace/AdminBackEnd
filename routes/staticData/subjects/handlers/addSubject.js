'use strict';
const RDS = require('@anzuev/studcloud.rds');
const SI = RDS.getSubjectModel();
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;


/**
 * @swagger
 * /api/subjects/addSubject:
 *   post:
 *     tags:
 *       - Subjects
 *     description: Add disabled subject
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: title
 *         type: string
 *         required: true
 *         in: formData
 *         description: Title for new subject
 *     responses:
 *       200:
 *         description: data is correct, subject was created
 *         schema:
 *           $ref: "#/definitions/subjectItem"
 *       400:
 *         description: creation failed
 *         schema:
 *            $ref: '#/definitions/Error'
 */

module.exports = function*() {
	let title = this.request.body.title;
	if(title.length < 2){
		throw new ValidationError(400, "Title too short");
	}
	try{
		let subject = yield* SI.createNew(title);
		this.body = subject;
	}catch (err){
		if(err.code == 400){
			throw new ValidationError(400, err.message);
		}
		throw err;
	}
};
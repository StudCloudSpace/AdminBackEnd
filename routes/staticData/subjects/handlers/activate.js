'use strict';
const SI = global.RDS.getSubjectModel();
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;
const Mongoose = require('mongoose');




/**
 * @swagger
 * /api/subjects/enable:
 *   post:
 *     tags:
 *       - Subjects
 *     description: Activate subject
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         type: string
 *         required: true
 *         in: formData
 *         description: Subject's id
 *     responses:
 *       200:
 *         description: Subject enabled
 *       400:
 *         description: Incorrect id
 *         schema:
 *            $ref: '#/definitions/Error'
 *       404:
 *         description: no such subject
 *         schema:
 *            $ref: '#/definitions/Error'
 *
 */

module.exports = function*() {
	let id;
	try {
        id = Mongoose.Types.ObjectId(this.request.body.id);
    }catch (err){
	    throw new ValidationError(400, "incorrect id");
    }

	let res = yield SI.enable(id);

	if (res == null){
		throw new ValidationError(404, "No such subject");
	} else{
		this.body = yield SI.getById(id);
	}
};
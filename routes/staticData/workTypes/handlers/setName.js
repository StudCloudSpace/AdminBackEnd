'use strict';
const WI = RDS.getWorkTypeModel();
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;
const Mongoose = require('mongoose');


/**
 * @swagger
 * /api/workTypes/setName:
 *   post:
 *     tags:
 *       - WorkTypes
 *     description: Change workType's name
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: formData
 *         description: WorkType's id
 *         type: string
 *         required: true
 *       - name: newTitle
 *         in: formData
 *         description: new title
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: data is correct, subject was created
 *       400:
 *         description: incorrect id
 *         schema:
 *            $ref: '#/definitions/Error'
 *       500:
 *         description: DB error
 *         schema:
 *            $ref: '#/definitions/Error'
 */
module.exports = function*() {
	let id = this.request.body.id;
	let newTitle = this.request.body.newTitle;

    try {
        id = Mongoose.Types.ObjectId(id);
    }catch (e){
        throw new ValidationError(400, "Bad id passed")
    }

	if(newTitle.length <= 2){
		throw new ValidationError(400, "Title must be at least 2 chars")
	}

	yield WI.setName(id, newTitle);

	this.body = {result: true};

};
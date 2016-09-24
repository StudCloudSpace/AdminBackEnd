'use strict';
const WI = global.RDS.getWorkTypeModel();
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;



/**
 * @swagger
 * /api/workTypes/addType:
 *   post:
 *     tags:
 *       - WorkTypes
 *     description: Add disabled workType
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: title
 *         in: formData
 *         description: Название типа работы
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: data is correct, worktype has been created
 *         schema:
 *           $ref: "#/definitions/WorkTypeItem"
 *       400:
 *         description: creation failed
 *         schema:
 *            $ref: '#/definitions/Error'
 */
module.exports = function*() {

	let title = this.request.body.title;

	if(title.length <= 2){
		throw new ValidationError(400, "Title must be at least 2 chars");
	}
	let workType = yield* WI.createNew(title);

	this.body = workType;

};
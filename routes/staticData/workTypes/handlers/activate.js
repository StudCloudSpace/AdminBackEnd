'use strict';
const WI = RDS.getWorkTypeModel();
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;
const Mongoose = require('mongoose');



/**
 * @swagger
 * /api/workTypes/enable:
 *   post:
 *     tags:
 *       - WorkTypes
 *     description: Activate workType
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: formData
 *         description: WorkType's id
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: workType enabled
 *         schema:
 *            type: object
 *            properties:
 *               result:
 *                  type: boolean
 *       400:
 *         description: incorrect id
 *         schema:
 *            $ref: '#/definitions/Error'
 *       404:
 *         description: No worktype found
 *         schema:
 *            $ref: '#/definitions/Error'
 *       500:
 *         description: DB error
 *         schema:
 *            $ref: '#/definitions/Error'
 */
module.exports = function*() {
	let id;
	try {
        id = Mongoose.Types.ObjectId(this.request.body.id);
	}catch (e){
        throw new ValidationError(400, "Bad id passed");
    }

	yield WI.enable(id);
	this.body = {result: true};

};
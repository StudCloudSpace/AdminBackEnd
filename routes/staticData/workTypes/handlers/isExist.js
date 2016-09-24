'use strict';
const WI = RDS.getWorkTypeModel();
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;
const Mongoose = require('mongoose');



/**
 * @swagger
 * /api/workTypes/isExist:
 *   get:
 *     tags:
 *       - WorkTypes
 *     description: Check if such workType exists
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: query
 *         description: WorkType's id
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: ok
 *         schema:
 *            type: object
 *            properties:
 *               result:
 *                  type: boolean
 *       400:
 *         description: Bad id passed
 *         schema:
 *            $ref: '#/definitions/Error'
 *       500:
 *         description: DB error
 *         schema:
 *            $ref: '#/definitions/Error'
 */
module.exports = function*() {
	let id = this.request.query.id;
    try {
        id = Mongoose.Types.ObjectId(id);
    }catch (e){
        throw new ValidationError(400, "Bad id passed");
    }
	let res = yield WI.isExist(id);
	this.body = {result: res};
};
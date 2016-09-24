'use strict';
const WI = RDS.getWorkTypeModel();
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;




/**
 * @swagger
 * /api/workTypes/getDisabled:
 *   get:
 *     tags:
 *       - WorkTypes
 *     description: Get only disabled workTypes
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: search
 *         in: query
 *         description: string for search
 *         type: string
 *         required: false
 *       - name: skip
 *         in: query
 *         description: how much pages should skip( 0 by default)
 *         type: number
 *         required: false
 *     responses:
 *       200:
 *         description: all information about workTypes
 *         schema:
 *            type: array
 *            items:
 *               $ref: '#/definitions/workTypeItem'
 *       204:
 *         description: no such workTypes
 *         schema:
 *            $ref: '#/definitions/Error'
 *
 */

module.exports = function*() {
	let search = this.request.query.search || "";
	let skip = this.request.query.skip || 0;
	let res = yield WI.getDisabled(search,skip);
	this.body = res;
};
'use strict';
const WI = RDS.getWorkTypeModel();

/**
 * @swagger
 * /api/workTypes/getEnabled:
 *   get:
 *     tags:
 *       - WorkTypes
 *     description: Get only enabled workTypes
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
 *         description: how much pages should skip
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
	let res = yield WI.getEnabled(search,skip);
	this.body = res;
};
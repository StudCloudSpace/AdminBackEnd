'use strict';
const WI = RDS.getWorkTypeModel();
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;
const Mongoose = require('mongoose');




/**
 * @swagger
 * /api/workTypes/getAll:
 *   get:
 *     tags:
 *       - WorkTypes
 *     description: Get all workTypes
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
 *         description: array of worktype
 *         schema:
 *            type: array
 *            items:
 *               $ref: '#/definitions/workTypeItem'
 *       204:
 *         description: No worktype found
 *         schema:
 *            $ref: '#/definitions/Error'
 */
module.exports = function*() {
	let search = this.request.query.search || "";
	let skip = this.request.query.skip || 0;

	let res = yield WI.getAll(search,skip);

	this.body = res;
};
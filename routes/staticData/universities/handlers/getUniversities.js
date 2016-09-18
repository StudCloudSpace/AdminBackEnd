'use strict';
const UI = global.RDS.getUniversityModel();
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;


/**
 * @swagger
 * /api/universities/getUniversities:
 *   get:
 *     tags:
 *       - Universities
 *     description: Get universities
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: search
 *         in: formData
 *         description: string for search
 *         type: string
 *         required: false
 *       - name: format
 *         in: formData
 *         description: if exists - full university's title, else - only short title. Doesn't influence on search string.
 *         type: string
 *         required: false
 *     responses:
 *       200:
 *         description: Information array
 *         type: array
 *         items:
 *            schema:
 *               $ref: '#/definitions/universityItem'
 *       204:
 *         description: No such items
 */
module.exports = function*() {
	let title = this.request.query.title || "";
	let format = this.request.query.format;
	let res = yield UI.getUniversitiesByTitle(title,format);
	this.body = res;
};
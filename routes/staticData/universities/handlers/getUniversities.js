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
 *         in: query
 *         description: string for search
 *         type: string
 *         required: false
 *       - name: format
 *         in: query
 *         description: if exists - full university's title, else - short title.
 *         type: string
 *         required: false
 *     responses:
 *       200:
 *         description: Information array
 *         schema:
 *            type: array
 *            items:
 *               type: object
 *               properties:
 *                  title:
 *                      type: String
 *                  id:
 *                      type: String
 *       204:
 *         description: No such items
 */
module.exports = function*() {
	let title = this.request.query.search || "";
	let format = this.request.query.format;
	let res = yield UI.getUniversitiesByTitle(title,format);
	this.body = res;
};
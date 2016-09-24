'use strict';
const UI = global.RDS.getUniversityModel();
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;


/**
 * @swagger
 * /api/universities/getFaculties:
 *   get:
 *     tags:
 *       - Universities
 *     description: Get faculties
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: query
 *         in: query
 *         description: string for search
 *         type: string
 *         required: false
 *       - name: format
 *         in: query
 *         description: if exists - full faculty's title, else - only short title. Doesn't influence on search string.
 *         type: string
 *         required: false
 *       - name: university
 *         in: query
 *         description: University id
 *         type: string
 *         required: false
 *     responses:
 *       200:
 *         description: Faculties array
 *         schema:
 *            type: array
 *            items:
 *               $ref: '#/definitions/facultyItem'
 *       204:
 *         description: No items found
 *         schema:
 *            $ref: '#/definitions/Error'
 */
module.exports = function*() {
	let title = this.request.query.query || "";
	let format = this.request.query.format;
	let university = this.request.query.university;
	let res = yield UI.getFacultiesByTitle(title,university,format);
	this.body = res;
};
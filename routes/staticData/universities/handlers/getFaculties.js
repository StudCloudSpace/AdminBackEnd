'use strict';
const UI = global.RDS.getUniversityModel();
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;


/*
 * 12swagger
 * /api/universities/getFaculties:
 *   get:
 *     tags:
 *       - Universities
 *     description: Get faculties
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
 *         description: if exists - full faculty's title, else - only short title. Doesn't influence on search string.
 *         type: string
 *         required: false
 *     responses:
 *       200:
 *         description: Information array
 *         schema:
 *            $ref: '#/definitions/getUniversityInfo'
 *       204:
 *         description: No such items
 *         schema:
 *            $ref: '#/definitions/Error'
 */
module.exports = function*() {
    try {
        let title = this.request.query.title || ""; //regex
        let format = this.request.query.format;
        let university = this.request.query.university;
        let res = yield UI.getFacultiesByTitle(title,university,format);
        this.body = res;
        this.status = 200;
        log.info(res);
    } catch (e){
        throw e;
    }
};
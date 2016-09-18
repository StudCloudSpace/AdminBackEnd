'use strict';
const UI = global.RDS.getUniversityModel();
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;




/**
 * @swagger
 * /api/universities/addFaculty:
 *   post:
 *     tags:
 *       - Universities
 *     description: Add faculty to university
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: formData
 *         description: University's id
 *         type: string
 *         required: true
 *       - name: title
 *         in: formData
 *         description: Faculty title
 *         type: string
 *         required: true
 *       - name: shortTitle
 *         in: formData
 *         description: Short title
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: data is correct, faculty was added to university
 *         schema:
 *            $ref: '#/definitions/universityItem'
 *       400:
 *         description: creation failed, wrong data
 *         schema:
 *            $ref: '#/definitions/Error'
 */
module.exports = function*() {
    try {
        let id = this.request.body.id;
        let title = this.request.body.title;
        let shortTitle = this.request.body.shortTitle;
        let s = yield UI.getById(id);
        let condition = title && shortTitle;
        if(condition == undefined) throw new ValidationError(400, "Fill each parameter");
        else {
            s.addFaculty(title,shortTitle);
            yield s.saveUniversity();
            this.status = 200;
        }
    }catch (e){
        log.error(e);
        throw e;
    }
};
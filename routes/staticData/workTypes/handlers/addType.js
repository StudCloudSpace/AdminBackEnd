'use strict';
const WI = global.RDS.getWorkTypeModel();
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;



/**
 * @swagger
 * /workTypes/addType:
 *   post:
 *     tags:
 *       - WorkTypes
 *     description: Add disabled workType
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: title
 *         in: formData
 *         description: Название типа работы
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: data is correct, worktype has been created
 *         schema:
 *           $ref: "#/definitions/WorkTypeItem"
 *       400:
 *         description: creation failed
 *         schema:
 *            $ref: '#/definitions/Error'
 */
module.exports = function*() {
    try {
        let w = new WI;
        w.title = this.request.body.title;
        if (w.title < 1) throw new ValidationError(400, "Title is too short");
        else {
            let a = yield w.saveType();
            log.info(a);
            this.body = {
                id: w._id,
                title: w.title,
                created: w.created
            };
            this.status = 200;
        }
    }catch (e){
        if(e.code == 11000 || e.code == 11001) throw new ValidationError(400, "Such type also exist");
        else{
            throw new ValidationError(500);
        }
    }
};
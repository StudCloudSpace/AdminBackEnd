'use strict';
const SI = global.RDS.getSubjectModel();

/**
 * @swagger
 * /api/subjects/getAllSubjects:
 *   get:
 *     tags:
 *       - Subjects
 *     description: Get all subjects
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: search
 *         type: string
 *         required: false
 *         in: query
 *         description: string for search
 *       - name: skip
 *         type: string
 *         required: false
 *         in: query
 *         description: how much pages it should skip from first element
 *     responses:
 *       200:
 *         description: Subjects found
 *         schema:
 *           type: array
 *           items:
 *              $ref: '#/definitions/subjectItem'
 *       204:
 *         description: There is no such subjects
 *       400:
 *         description: some error, watch description
 *         schema:
 *            $ref: '#/definitions/Error'
 */


module.exports = function*() {
    try {
        let search = this.request.query.search || "";
        let skip = this.request.query.skip;
        let res = yield SI.getAll(search,skip);

        this.body = res;
        this.status = 200;
    } catch (e){
       throw e;
    }
};
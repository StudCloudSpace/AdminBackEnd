'use strict';
const UI = global.RDS.getUniversityModel();
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;


/**
 * @swagger
 * /api/universities/addUniversity:
 *   post:
 *     tags:
 *       - Universities
 *     description: Add university
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: title
 *         in: formData
 *         description: Название университета, по которому его можно будет найти
 *         type: string
 *         required: true
 *       - name: shortTitle
 *         in: formData
 *         description: Краткое название
 *         type: string
 *         required: true
 *       - name: city
 *         in: formData
 *         description: Город, в котором расположен универ
 *         type: string
 *         required: true
 *       - name: street
 *         in: formData
 *         description: Улица, на которой расположен универ
 *         type: string
 *         required: true
 *       - name: building
 *         in: formData
 *         description: Номер дома
 *         type: string
 *         required: true
 *       - name: rating
 *         in: formData
 *         description: Рейтинг универа(все универы при поиске сортируются по рейтингу)
 *         type: number
 *         required: true
 *     responses:
 *       200:
 *         description: data is correct, university was created
 *         schema:
 *           $ref: "#/definitions/universityItem"
 *       400:
 *         description: creation failed
 *         schema:
 *            $ref: '#/definitions/Error'
 */
module.exports = function*() {

	let s = {
		title: this.request.body.title,
		shortTitle: this.request.body.shortTitle,
		city: this.request.body.city,
		street: this.request.body.street,
		building: this.request.body.building,
		rating: this.request.body.rating
	};
	let condition = s.title && s.shortTitle && s.city && s.street && s.building && s.rating;
	if(!condition) throw new ValidationError(400, "Not enough data to process");
	else {
		this.body = yield* UI.createNew(s.title, s.shortTitle, s.street, s.building, s.city, s.rating);
	}
};
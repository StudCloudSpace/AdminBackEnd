'use strict';


/**
 * @swagger
 * /api/users/getUsersPerUniversity:
 *   get:
 *     tags:
 *       - Users
 *     description: Получение количества пользователей в каждом универе
 *     produces:
 *       - application/json
 *     parameters:
 *     responses:
 *       200:
 *         description: Amount of new users for all universities
 *         schema:
 *           type: array
 *           items:
 *             $ref: "#/definitions/newUsersStat"
 *       403:
 *         description: Action forbidden.
 *       500:
 *         description: internal error
 *         schema:
 *           $ref: "#/definitions/error"
 */
module.exports = function*(){

	let a = yield* UAMS.getUsersStaticsPerUniversity();
	console.log(a);
	let rawStats = yield* UAMS.getUsersStaticsPerUniversity();
	let results = [];

	for(let i = 0; i < rawStats.length; i++){
		let university;
		try{
			university = (yield global.RDS.getUniversityModel().getById(rawStats[i]._id))
				.getTitle();
		}catch(err){
			university = "Не указано";
		}

		results.push({
			type: university,
			amount: rawStats[i].counter
		})
	}
	this.body = results;
};



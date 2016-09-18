'use strict';


/**
 * @swagger
 * /api/users/getNewUsersStat:
 *   get:
 *     tags:
 *       - Users
 *     description: Получение количества новых пользователей за все периоды
 *     produces:
 *       - application/json
 *     parameters:
 *
 *     responses:
 *       200:
 *         description: Amount of new users for all periods
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/newUsersStat'
 *       403:
 *         description: Action forbidden.
 *       500:
 *         description: internal error
 *         schema:
 *           $ref: "#/definitions/error"
 */
module.exports = function*(){
	let result = [];
	let today = {
		type: "today",
		amount: yield* UAMS.countNewUsersToday()
	};

	let week = {
		type: 'week',
		amount: yield* UAMS.countNewUsersThisWeek()
	};

	let month = {
		type: "month",
		amount: yield* UAMS.countNewUsersThisMonth()
	};

	let year = {
		type: "year",
		amount: yield* UAMS.countNewUsersThisYear()
	};

	let all = {
		type: "all",
		amount: yield* UAMS.countAllUsers()
	};

	result.push(today);
	result.push(week);
	result.push(month);
	result.push(year);
	result.push(all);

	this.body = result;
};



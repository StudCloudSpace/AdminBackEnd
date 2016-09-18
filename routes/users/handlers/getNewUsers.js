'use strict';


/**
 * @swagger
 * /api/users/getNewUsers:
 *   get:
 *     tags:
 *       - Users
 *     description: Получение количества новых пользователей за период времени.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: period
 *         type: string
 *         required: true
 *         in: query
 *         description: Period of time. Available 'today', 'week', 'month', 'year', 'all'
 *     responses:
 *       200:
 *         description: Amount of new users for period received
 *         schema:
 *           $ref: "#/definitions/newUsersStat"
 *       403:
 *         description: Action forbidden.
 *       500:
 *         description: internal error
 *         schema:
 *           $ref: "#/definitions/error"
 */
module.exports = function*(){
	let period = this.request.query.period;
	let result;
	switch (period){
		case "today":
			result = yield* UAMS.countNewUsersToday();
			break;
		case "week":
			result = yield* UAMS.countNewUsersThisWeek();
			break;
		case "month":
			result = yield* UAMS.countNewUsersThisMonth();
			break;
		case "year":
			result = yield* UAMS.countNewUsersThisYear();
			break;
		case "all":
			result = yield* UAMS.countAllUsers();
			break;
		default:
			result = 0;
	}

	this.body = {
		type: period,
		amount: result
	};
};



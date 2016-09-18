'use strict';
const Router = require('koa-router');

let authRouter = new Router();

authRouter.prefix("/auth");


/**
 * @swagger
 * /auth/signIn:
 *   post:
 *     tags:
 *       - Auth
 *     description: Make admin authorized
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: mail
 *         type: string
 *         required: true
 *         in: formData
 *         description: Mail for login
 *       - name: password
 *         type: string
 *         required: true
 *         in: formData
 *         description: Password for login
 *     responses:
 *       200:
 *         description: data is correct, session binded with user.
 *         schema:
 *           $ref: "#/definitions/user"
 *       401:
 *         description: Authorization failed, incorrect mail or password.
 *       500:
 *         description: internal error
 *         schema:
 *           $ref: "#/definitions/error"
*/
authRouter.post('/signIn', require("./handlers/signIn"));



/**
 * @swagger
 * /auth/logout:
 *   post:
 *     tags:
 *       - Auth
 *     description: log out
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: all is correct, session unpinned from user
 *       400:
 *         description: Some error
 *         schema:
 *            $ref: '#/definitions/Error'
 */
authRouter.post('/logout', require('./handlers/logout'));




//экспорт роутера
module.exports = authRouter;
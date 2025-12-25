const express = require('express')
const { signup, login } = require('../controller/authCon')

const authRoute =  express.Router()


authRoute.post('/signup', signup)

/**
 * @swagger
 * /v1/auth/login:
 *   post:
 *     tags: [Auth]
 *     description: User login
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *             type: object
 *             properties:
 *               email:
 *                  type: string
 *                  example: maki@gmail.com
 *               password:
 *                  type: string
 *                  example: vanchay
 *     responses:
 *       200:
 *         description: Return a created book
 */
authRoute.post('/login', login)

module.exports = authRoute
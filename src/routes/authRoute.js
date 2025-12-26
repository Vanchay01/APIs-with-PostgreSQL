const express = require("express");
const { signup, login } = require("../controller/authCon");

const authRoute = express.Router();

/**
 * @swagger
 * /v1/auth/signup:
 *   post:
 *     tags: [Auth]
 *     description: User Sign Up
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                  type: string
 *                  example: ""
 *              email:
 *                  type: string
 *                  example: "@gmail.com"
 *              password:
 *                  type: string
 *                  example: "vanchay"
 *     responses:
 *      200:
 *          description: Ruturn Sign Up successfully...
 */
authRoute.post("/signup", signup);
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
 *         description: Return Login user successfully... 
 */
authRoute.post("/login", login);

module.exports = authRoute;

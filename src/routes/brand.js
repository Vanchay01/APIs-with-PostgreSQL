const express = require('express');
const { addBrand, getBrand, getBrandById, deleteBrand, updateBrand } = require('../controller/brandCon');

const brandRouter = express.Router();

/**
 * @swagger
 * /v1/brand:
 *  post:
 *    tags: [Brand]
 *    description: Create a new brand...
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                  type: string
 *                  example: ""
 *              logo:
 *                  type: string
 *                  example: "https://example.com/logo.png"
 *    responses:
 *      201:
 *        description: Brand created successfully...
 */
brandRouter.post("/", addBrand)
/**
 * @swagger
 * /v1/brand:
 *  get:
 *    tags: [Brand]
 *    description: Get all brands...
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Brands retrieved successfully...
 */
brandRouter.get("/", getBrand)
/**
 * @swagger
 * /v1/brand/{id}:
 *  get:
 *    tags: [Brand]
 *    description: Get a brand by ID...
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schame:
 *          type: string 
 *    responses:
 *      200:
 *        description: Brand retrieved successfully...
 */
brandRouter.get("/:id", getBrandById)
/**
 * @swagger
 * /v1/brand:
 *  delete:
 *    tags: [Brand]
 *    description: Delete an existing brand...
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schame:
 *          type: string 
 *    responses:
 *      200:
 *        description: Brand deleted successfully...
 */
brandRouter.delete("/:id", deleteBrand)
/**
 * @swagger
 * /v1/brand:
 *  put:
 *    tags: [Brand]
 *    description: Update an existing brand...
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schame:
 *          type: string 
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                  type: string
 *                  example: ""
 *              logo:
 *                  type: string
 *                  example: "https://example.com/logo.png"
 *    responses:
 *      200:
 *        description: Brand updated successfully...
 */
brandRouter.patch("/:id", updateBrand)

module.exports = brandRouter
const express = require("express");
const {
  addCategory,
  getCategory,
  getCategoryById,
  deleteCategory,
  updateCategory,
} = require("../controller/categoryCon");

const categoryRouter = express.Router();

/**
 * @swagger
 * /v1/category:
 *  post:
 *    tags: [Category]
 *    description: Add a new category...
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
 *    responses:
 *      201:
 *        description: Category added successfully...
 */
categoryRouter.post("/", addCategory);
/**
 * @swagger
 * /v1/category:
 *  get:
 *    tags: [Category]
 *    description: Get all categories...
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Category added successfully...
 */
categoryRouter.get("/", getCategory);
/**
 * @swagger
 * /v1/category/{id}:
 *  get:
 *    tags: [Category]
 *    description: Get Category By ID...
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
 *        description: Get Category Successfully...
 */
categoryRouter.get("/:id", getCategoryById);
/**
 * @swagger
 * /v1/category/{id}:
 *  delete:
 *    tags: [Category]
 *    description: Delete Category By ID...
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
 *        description: Delete Category Successfully...
 */
categoryRouter.delete("/:id", deleteCategory);
/**
 * @swagger
 * /v1/category:
 *  put:
 *    tags: [Category]
 *    description: Update a existing category...
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
 *    responses:
 *      201:
 *        description: Category updated successfully...
 */
categoryRouter.put("/:id", updateCategory);

module.exports = categoryRouter;

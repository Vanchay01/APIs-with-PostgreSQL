const express = require("express");
const {
  getUser,
  getUserById,
  deleteUser,
  updateUser,
  addUser,
  addFavorite,
  removeFavorite,
  getFavorites,
} = require("../controller/userCon");
const userRouter = express.Router();
userRouter.post("/favorites/", addFavorite);
userRouter.get("/favorites/", getFavorites);
userRouter.delete("/favorites/", removeFavorite);

/**
 * @swagger
 * /v1/users/{id}:
 *  get:
 *    tags: [User]
 *    description: Get User By ID...
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
 *        description: Get User Successfully...
 */
userRouter.get("/:id", getUserById);
/**
 * @swagger
 * /v1/users/:
 *  get:
 *    tags: [User]
 *    description: Get User..
 *    security: 
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Get User...
 * 
 */
userRouter.get("/", getUser);
userRouter.delete("/:id", deleteUser);
userRouter.patch("/:id", updateUser);
userRouter.post("/", addUser)

module.exports = userRouter;
 


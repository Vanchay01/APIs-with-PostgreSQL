const express = require("express");
const {
  getUser,
  getUserById,
  deleteUser,
  updateUser,
} = require("../controller/userCon");
const userRouter = express.Router();

userRouter.get("/:id", getUserById);
userRouter.get("/", getUser);
userRouter.delete("/:id", deleteUser);
userRouter.patch("/:id", updateUser);

module.exports = userRouter;
 
 
 
 
 
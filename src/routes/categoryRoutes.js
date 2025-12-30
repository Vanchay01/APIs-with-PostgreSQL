const express = require("express");
const {
  addCategory,
  getCategory,
  getCategoryById,
  deleteCategory,
  updateCategory,
} = require("../controller/categoryCon");

const categoryRouter = express.Router();

categoryRouter.post("/", addCategory);
categoryRouter.get("/", getCategory);
categoryRouter.get("/:id", getCategoryById);
categoryRouter.delete("/:id", deleteCategory);
categoryRouter.patch("/:id", updateCategory);

module.exports = categoryRouter;

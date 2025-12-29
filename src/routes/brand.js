const express = require('express');
const { addBrand, getBrand, getBrandById, deleteBrand, updateBrand } = require('../controller/brandCon');

const brandRouter = express.Router();

brandRouter.post("/", addBrand)
brandRouter.get("/", getBrand)
brandRouter.get("/:id", getBrandById)
brandRouter.delete("/:id", deleteBrand)
brandRouter.patch("/:id", updateBrand)

module.exports = brandRouter
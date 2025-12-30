const express = require("express");
const { addProduct, getByFilter } = require("../controller/productCon");

const productRouter = express.Router();

productRouter.post("/", addProduct);
productRouter.get("/", getByFilter);

module.exports = productRouter;

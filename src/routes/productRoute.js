const express = require("express");
const { addProduct } = require("../controller/productCon");

const productRouter = express.Router();

productRouter.post("/", addProduct);

module.exports = productRouter;

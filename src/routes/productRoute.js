const express = require("express");
const { addProduct, getByFilter, updateProduct, deleteProduct, getProductByid } = require("../controller/productCon");

const productRouter = express.Router();

productRouter.post("/", addProduct);
productRouter.get("/", getByFilter);
productRouter.get("/:id", getProductByid);
productRouter.patch('/:id', updateProduct)
productRouter.delete('/:id', deleteProduct)

module.exports = productRouter;

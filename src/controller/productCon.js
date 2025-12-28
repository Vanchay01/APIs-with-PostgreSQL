const asyncHanlder = require("express-async-handler");
const productModel = require("../model/productModel");

const addProduct = asyncHanlder(async (req, res) => {
  const {
    barcode,
    name,
    part_number,
    description,
    specification,
    price,
    discount,
    warranty,
    by_categories,
    by_brands,
  } = req.body;
  const products = await productModel.save({
    barcode: barcode,
    name: name,
    part_number: part_number,
    description: description,
    specification: specification,
    price: price,
    discount: discount,
    warranty: warranty,
    by_categories: by_categories,
    by_brands: by_brands,
  });
  if (!products) {
    return res.json({
      message: `Add product Faild`,
      status: 400,
    });
  }
  return res.json({
    message: `Add product successfully`,
    status: 200,
  });
});

module.exports = {
  addProduct,
};

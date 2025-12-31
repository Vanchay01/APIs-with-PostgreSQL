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
  const result = await productModel.save({
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
  if (!result) {
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

const getByFilter = asyncHanlder(async (req, res) => {
  const brand = req.query.brand;
  const category = req.query.category;
  const result = await productModel.filter({
    brand: brand,
    category: category,
  });
  if (result.length == 0) {
    return res.json({
      message: `Not Found.....`,
      status: 400,
    });
  }
  return res.json({
    message: `Get Products`,
    status: 200,
    data: result,
  });
});

const updateProduct = asyncHanlder(async (req, res) => {
  const id = req.params.id;
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
  const result = await productModel.updateOne({
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
    id: id,
  });
  if (result.length == 0) {
    return res.json({
      message: "Update Faild",
      status: 400,
    });
  }
  return res.json({
    message: "Updated Product...!",
    status: 200,
    data: result,
  });
});

const deleteProduct = asyncHanlder(async (req, res) => {
  const id = req.params.id;
  const result = await productModel.deleteOne({ id: id });
  if (result.length == 0) {
    return res.json({
      message: "Delete Faild",
      status: 400,
    });
  }
  return res.json({
    message: "Delete Product...!",
    status: 200,
    data: result,
  });
});

const getProductByid = asyncHanlder(async(req, res)=>{
  const id = req.params.id;
  const result = await productModel.findOne({ id: id });
  if (result.length == 0) {
    return res.json({
      message: "Delete Faild",
      status: 400,
    });
  }
  return res.json({
    message: "Delete Product...!",
    status: 200,
    data: result,
  });
})

module.exports = {
  addProduct,
  getByFilter,
  updateProduct,
  deleteProduct,
  getProductByid,
};

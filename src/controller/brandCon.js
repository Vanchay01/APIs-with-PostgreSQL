const asyncHandler = require("express-async-handler");
const brandModel = require("../model/brandModel");

const addBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const brand = await brandModel.save({ name: name });
  if (!brand) {
    return res.json({
      message: "Add Brand is faild!!",
      status: 400,
    });
  }
  return res.json({
    message: "Add brand is successfully..!",
    status: 201,
    data: brand,
  });
});

const getBrand = asyncHandler(async (req, res) => {
  const brand = await brandModel.find();
  if (!brand) {
    return res.json({
      message: "Not Found....!",
      status: 400,
    });
  }
  return res.json({
    message: "Get brands successfully..!",
    status: 200,
    data: brand,
  });
});
const getBrandById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const brand = await brandModel.findOne({ id: id });
  if (!brand) {
    return res.json({
      message: "Not Found....!",
      status: 400,
    });
  }
  return res.json({
    message: "Get one brands successfully..!",
    status: 200,
    data: brand,
  });
});
const deleteBrand = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const brand = await brandModel.deleteOne({ id: id });
  if (brand.length == 0) {
    return res.json({
      message: "Not Found....!",
      status: 400,
    });
  }
  return res.json({
    message: "Deleted brands...!",
    status: 200,
    data: brand,
  });
});
const updateBrand = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  const brand = await brandModel.updateOne({ id: id, name: name });
  if (brand.length == 0) {
    return res.json({
      message: "Not Found....!",
      status: 400,
    });
  }
  return res.json({
    message: "Updated brands...!",
    status: 200,
    data: brand,
  });
});

module.exports = { addBrand, getBrand, getBrandById, deleteBrand, updateBrand };

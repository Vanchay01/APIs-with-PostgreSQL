const asyncHandler = require("express-async-handler");
const categoryModel = require("../model/categoryModel");

const addCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const brand = await categoryModel.save({ name: name });
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

const getCategory = asyncHandler(async (req, res) => {
  const brand = await categoryModel.find();
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
const getCategoryById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const brand = await categoryModel.findOne({ id: id });
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
const deleteCategory = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const brand = await categoryModel.deleteOne({ id: id });
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
const updateCategory = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  const brand = await categoryModel.updateOne({ id: id, name: name });
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

module.exports = {
  addCategory,
  getCategory,
  getCategoryById,
  deleteCategory,
  updateCategory,
};

const asyncHandler = require("express-async-handler");
const userModel = require("../model/userModel");
const pool = require("../config/db");

const getUser = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const result = await userModel.getAll({ page: page, limit: limit });
  const total_page = Math.ceil(result.totalUser / limit);
  return res.json({
    message: "Get User Successfully....!",
    status: 200,
    pagination: {
      current_page: page,
      total_page,
      limit: limit,
      total_users: result.totalUser,
    },
    data: result.user,
  });
});

const getUserById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const result = await userModel.findById({ id: id });
  if (!result) {
    return res.json({
      message: `User Not Found`,
      status: 400,
    });
  }
  return res.json({
    message: "Get User By Id.....!",
    status: 200,
    data: result,
  });
});

const deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id || isNaN(id)) {
    return res.json({
      message: "Invalid user id",
      status: 400,
    });
  }
  const result = await userModel.deleteById({ id: id });
  if (!result) {
    return res.json({
      message: "User Not Found...",
      status: 404,
    });
  }
  return res.json({
    message: "User deleted successfully",
    status: 200,
    data: result,
  });
});
const updateUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { username, address, phone_number, age, sex, birth } = req.body;
  const findOne = await userModel.findById({ id: id });
  if (!findOne) {
    return res.json({
      message: `User Not Found`,
      status: 400,
    });
  }
  const result = await userModel.updateById({
    id: id,
    username: username,
    address: address,
    phone_number: phone_number,
    age: age,
    sex: sex,
    birth: birth,
  });
  return res.json({
    message: "User Update Already...",
    status: 200,
    data: result,
  });
});

const addUser = asyncHandler(async (req, res) => {
  const {
    username,
    email,
    address,
    phone_number,
    password,
    role,
    age,
    sex,
    birth,
  } = req.body;
  const result = userModel.save({
    username: username,
    email: email,
    address: address,
    phone_number: phone_number,
    password: password,
    role: role,
    age: age,
    sex: sex,
    birth: birth,
  });
  return res.json({
    message: `Add User: ${email} Successfully....`,
    status: 201,
    data: result
  });
});
module.exports = { getUser, getUserById, deleteUser, updateUser, addUser };

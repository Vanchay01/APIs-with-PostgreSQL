const express = require('express');
const { addBrand } = require('../controller/brandCon');

const brandRouter = express.Router();

brandRouter.post("/", addBrand)

module.exports = brandRouter
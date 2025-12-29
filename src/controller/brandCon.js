const asyncHandler = require("express-async-handler");
const brandModel = require("../model/brandModel");

const addBrand = asyncHandler(async (req, res) => {
    const {name} = req.body
    const brand = await brandModel.save({name: name})
    if(!brand){
        return res.json({
            message: "Add Brand is faild!!",
            status: 400
        })
    }
    return res.json({
        message: "Add brand is successfully..!",
        status: 201,
        data: brand
    })
});


module.exports = {addBrand}

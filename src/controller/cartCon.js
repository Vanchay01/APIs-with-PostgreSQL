const asyncHandler = require("express-async-handler")
const cartModel = require("../model/cartModel")

const addCard = asyncHandler(async(req, res)=>{
    const {byUser, status} = req.body
    const exsisting = cartModel.findCard({byUser: byUser, status: status})
    if(!exsisting){
        return res.json("Not found exsisting")
    }
    return res.json("exsisting")

})
module.exports = {addCard}
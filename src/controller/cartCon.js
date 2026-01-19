const asyncHandler = require("express-async-handler")
const cartModel = require("../model/cartModel")

const addCard = asyncHandler(async(req, res)=>{
    const {byUser, status} = req.body
    const exsisting = await cartModel.findCard({byUser: byUser, status: status})
    console.log("controller", exsisting)
    if(exsisting){
        return res.json({
            message: "Cart created already",
            status: 200,
        })
    }
    console.log("===>controller", exsisting)
    const result = await cartModel.save({byUser: byUser, status: status})
    return res.json({
        message: "Added new carts",
        status: 200,
        data: result
    })

})
module.exports = {addCard}
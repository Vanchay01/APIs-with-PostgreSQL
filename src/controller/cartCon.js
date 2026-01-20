const asyncHandler = require("express-async-handler")
const cartModel = require("../model/cartModel")

const addCard = asyncHandler(async(req, res)=>{
    const byUser = req.params.id
    const {byProduct, quantity} = req.body
    const result = await cartModel.addToCart({byUser: byUser, byProduct: byProduct, quantity: quantity || 1})
    console.log("controller", result)
    // if(result){
    //     return res.json({
    //         message: "Cart created already",
    //         status: 200,
    //     })
    // }
    return res.json({
        message: "Added new carts",
        status: 200,
        data: result
    })

})
module.exports = {addCard}
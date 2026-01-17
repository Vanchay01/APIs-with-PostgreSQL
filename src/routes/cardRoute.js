const express = require("express")
const { addCard } = require("../controller/cartCon")
const cardRouter = express.Router()

cardRouter.post("/", addCard)

module.exports = cardRouter
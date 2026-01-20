const express = require("express")
const { addCard } = require("../controller/cartCon")
const cardRouter = express.Router()

cardRouter.post("/:id", addCard)

module.exports = cardRouter
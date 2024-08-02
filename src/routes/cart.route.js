const express = require("express");
const route = express.Router();
const CartController = require("../controller/cart.controller");

route.post("/add", CartController.addToCart);

route.post("/remove", CartController.removeFromCart);

route.get("/get/:userId", CartController.getCart);

route.post("/clear/:userId", CartController.clearCart);

module.exports = { CartRoutes: route };

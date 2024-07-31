const express = require("express");
const route = express.Router();
const CartController = require("../controller/cart.controller");

route.post("/add/:userId", CartController.addToCart);

route.put("/update/:userId", CartController.updateCartProductQuantity);

route.delete("/delete-product/:userId", CartController.deleteProductFromCart);

route.get("/getAll", CartController.getAllCarts);

route.get("/get/:cartId", CartController.getCartById);

route.get("/get/user/:userId", CartController.getCartByUserId);

module.exports = { CartRoutes: route };

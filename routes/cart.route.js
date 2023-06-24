const express = require('express');
const route =  express.Router();
const CartController = require('../controller/cart.controller');

route.post('/add-to-cart/:userId',CartController.addToCart);

route.put('/update/cart/:userId',CartController.updateCartProductQuantity);

route.delete('/delete-product/cart/:userId',CartController.deleteProductFromCart);

route.get('/getAll/cart',CartController.getAllCarts);

route.get('/get/cart/:cartId',CartController.getCartById);

route.get('/get/cart/user/:userId',CartController.getCartByUserId);

module.exports={CartRoutes:route}
const express = require('express');
const route = express.Router();
const OrderController = require('../controller/order.Controller');

route.post('/place/order/:userId',OrderController.placeOrder);

route.get('/getAll/order',OrderController.getAllOrders);

route.get('/get/order/:Id',OrderController.getOrdersById);

route.get('/get-orderId/order/:orderId',OrderController.getOrdersByOrderId);

route.get('/get-DeliveryStatus/order',OrderController.getOrdersByDeliveryStatus);

route.get('/get-userId/order/:userId',OrderController.getOrdersByUserId);

route.put('/update/deliveryStatus/:orderId',OrderController.UpdateOrderDeliveryStatus);

route.put('/cancel/order/:userId',OrderController.CancelOrder);

route.delete('/delete/order/:Id',OrderController.deleteOrders);

module.exports ={OrderRoute : route}


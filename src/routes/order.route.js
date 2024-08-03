const express = require("express");
const route = express.Router();
const OrderController = require("../controller/order.Controller");

route.post("/calculate/amount-to-pay", OrderController.CalculateAmountToPay);

route.post("/initiate/payment", OrderController.initiatePayment);

route.post("/place", OrderController.placeOrder);

route.get("/getAll", OrderController.getAllOrders);

route.get("/get/:Id", OrderController.getOrdersById);

route.get("/get-orderId/:orderId", OrderController.getOrdersByOrderId);

route.get("/get-DeliveryStatus", OrderController.getOrdersByDeliveryStatus);

route.get("/get-userId/:userId", OrderController.getOrdersByUserId);

route.put(
    "/update/deliveryStatus/:orderId",
    OrderController.UpdateOrderDeliveryStatus,
);

route.put("/cancel/:userId", OrderController.CancelOrder);

route.delete("/delete/:Id", OrderController.deleteOrders);

module.exports = { OrderRoute: route };

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - finished
 *       properties:
 *
 *         id:
 *           type: string
 *           description: The auto-generated id
 *         OrderId:
 *           type: string
 *           description:  OrderId auto-generated
 *         BillingId:
 *           type: Schema.Types.ObjectId
 *           description:  BillingId filed is require
 *         userId:
 *           type: Schema.Types.ObjectId
 *           description:  userId filed is require
 *         name:
 *           type: string
 *           description: name filed is require
 *         brand:
 *           type: string
 *           description: brand filed is require
 *         description:
 *           type: string
 *           description: description filed is require
 *         LifeStage:
 *           type: string
 *           description: LifeStage filed is require
 *         BreedSize:
 *           type: string
 *           description: BreedSize filed is require
 *         flavor:
 *           type: string
 *           description: flavor filed is require
 *         vegNonVeg:
 *           type: string
 *           description: vegNonVeg filed is require
 *         size:
 *           type: string
 *           description: size filed is require
 *         images:
 *           type: array
 *           description: product images default []
 *         isTopProduct:
 *           type: boolean
 *           description: Default false
 *         isTrendingProduct:
 *           type: boolean
 *           description: Default false
 *         createdAt:
 *           type: string
 *           format: timestamps
 *           description: The date data was added
 *
 *         updatedAt:
 *           type: string
 *           format: timestamps
 *           description: The date data was updated
 *
 */

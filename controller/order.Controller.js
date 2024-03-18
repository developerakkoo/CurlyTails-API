const  Cart = require('../models/cart.model');
const Order = require('../models/order.model');
const Billing = require('../models/Billing.model');
const { generateCustomUuid} = require('custom-uuid');
const Refund = require('../models/refund.model');
const {getIO} = require('../socket');
exports.placeOrder = async(req,res)=>{
    try {
        const savedCart = await Cart.findOne({userId:req.params.userId});
        // console.log(savedCart);
        if (!savedCart) {
            return res.status(404).json({message:`Cart Not Found With This UserId:${req.params.userId}`,statusCode:404});
        }
        // const savedBill = await Billing.findOne({userId:req.params.userId});
        // if (!savedBill) {
        //     return res.status(404).json({message:`Bill Not Found With This UserId:${req.params.userId}`,statusCode:404});
        // }
        const orderObj ={
            OrderId: Math.ceil(Math.random() * 1000000+1984567),
            // BillingId:savedBill._id,
            userId:savedCart.userId,
            orderItems:req.body.cartItems,
            TotalItems:req.body.TotalItems,
            SubTotal:req.body.SubTotal
        }
        const idsToRemove = req.body.productIds
        let removedOrderedProductsFromCart = savedCart.cartItems.filter(product =>!idsToRemove.some(id => id.toString() === product._id.toString()));
        const createdOrder = await Order.create(orderObj);


        savedCart.cartItems = removedOrderedProductsFromCart
        savedCart.SubTotal =  savedCart.SubTotal - req.body.SubTotal
        savedCart.TotalItems =  savedCart.TotalItems - req.body.TotalItems

        // }
        // // savedCart.__v = tem != undefined
        // // ? tem
        // // :savedCart.__v = tem 
        await savedCart.save();
        // console.log(savedCart);
        const recentOrders = await Order.find({}).limit(10).sort('-1');
        getIO().emit('admin:recentOrders',recentOrders);
        res.status(200).json({msg:'Order Placed Successfully',statusCode:200,data:createdOrder});
    } catch (error) {
        console.log(error);
        res.status(500).json({Message:error.message,statusCode:500,status:'ERROR'});
    }
}
exports.CancelOrder= async(req,res) => {
    try {
        const savedOrder = await Order.findOne({userId:req.params.userId});
        if (!savedOrder) {
            return res.status(404).json({message:'Orders Not Found',statusCode:404});
        }
        savedOrder.isCancel = true != undefined
        ? true
        : savedOrder.isCancel
        const updatedOrder = await savedOrder.save()
        const refundObj ={
            userId:savedOrder._id,
            orderId:savedOrder.OrderId,
            description:req.body.description
        }
        await Refund.create(refundObj);
        res.status(200).json({message:`Order Cancel  Successfully You Will Get refund In 3-7 Business Days`,statusCode:200});
    } catch (error) {
        res.status(500).json({Message:error.message,statusCode:500,status:'ERROR'});
    }
}

exports.UpdateOrderDeliveryStatus= async(req,res) => {
    try {
        const savedOrder = await Order.findOne({_id:req.params.orderId});
        if (!savedOrder) {
            return res.status(404).json({message:'Orders Not Found',statusCode:404});
        }
        savedOrder.isDelivered = req.body.isDelivered != undefined
        ? req.body.isDelivered
        : savedOrder.isDelivered

        const updatedOrder = await savedOrder.save()
        res.status(200).json({message:'Order Delivery Status Updated Successfully',statusCode:200,data:updatedOrder});
    } catch (error) {
        res.status(500).json({Message:error.message,statusCode:500,status:'ERROR'});
    }
}

exports.getAllOrders = async(req,res) => {
    try {
        const savedOrder = await Order.find().limit(10).sort({'createdAt': -1});
        if (savedOrder.length == 0) {
            return res.status(404).json({message:'Orders Not Found',statusCode:404});
        }
        res.status(200).json({message:'All Order Fetched Successfully',statusCode:200,count:savedOrder.length,data:savedOrder});
    } catch (error) {
        res.status(500).json({Message:error.message,statusCode:500,status:'ERROR'});
    }
}


exports.getOrdersById= async(req,res) => {
    try {
        const savedOrder = await Order.findOne({_id:req.params.Id});
        if (savedOrder.length == 0) {
            return res.status(404).json({message:'Orders Not Found',statusCode:404});
        }
        res.status(200).json({message:'All Order Fetched Successfully',statusCode:200,data:savedOrder});
    } catch (error) {
        res.status(500).json({Message:error.message,statusCode:500,status:'ERROR'});
    }
}

exports.getOrdersByOrderId= async(req,res) => {
    try {
        const savedOrder = await Order.findOne({OrderId:req.params.orderId});
        if (savedOrder.length == 0) {
            return res.status(404).json({message:'Orders Not Found',statusCode:404});
        }
        res.status(200).json({message:'All Order Fetched Successfully',statusCode:200,data:savedOrder});
    } catch (error) {
        res.status(500).json({Message:error.message,statusCode:500,status:'ERROR'});
    }
}

exports.getOrdersByDeliveryStatus= async(req,res) => {
    try {
        const savedOrder = await Order.find({
            isDelivered:req.query.isDelivered
        });
        if (savedOrder.length == 0) {
            return res.status(404).json({message:'Orders Not Found',statusCode:404});
        }
        res.status(200).json({message:'All Order Fetched Successfully',statusCode:200,data:savedOrder});
    } catch (error) {
        res.status(500).json({Message:error.message,statusCode:500,status:'ERROR'});
    }
}



exports.getOrdersByUserId= async(req,res) => {
    try {
        const savedOrder = await Order.find({userId:req.params.userId})
        .populate({
            path:'orderItems.productId',
            select:[
                '-__v','-updatedAt','-createdAt','-isTopProduct','-isTrendingProduct',
                
            ]
            });
        if (savedOrder.length == 0) {
            return res.status(404).json({message:'Orders Not Found',statusCode:404});
        }
        res.status(200).json({message:'All Order Fetched Successfully',statusCode:200,data:savedOrder});
    } catch (error) {
        res.status(500).json({Message:error.message,statusCode:500,status:'ERROR'});
    }
}


exports.deleteOrders = async(req,res) => {
    try {
        const savedOrder = await Order.findOne({_id:req.params.Id});
        if (!savedOrder) {
            return res.status(404).json({message:'Orders Not Found',statusCode:404});
        }
        await savedOrder.deleteOne({_id:req.params.Id})
        res.status(200).json({message:'Order Deleted Successfully',statusCode:200});
    } catch (error) {
        res.status(500).json({Message:error.message,statusCode:500,status:'ERROR'});
    }
}

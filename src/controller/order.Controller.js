const Cart = require("../models/cart.model");
const Order = require("../models/order.model");
const dataModel = require("../models/data.model");
const productModel = require("../models/product.model");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
const Refund = require("../models/refund.model");
const promoCodeModel = require("../models/promoCode.model");
const {
    apiError,
    apiResponse,
    asyncHandler,
} = require("../utils/helper.utils");
const { getIO } = require("../socket");
const razorpay = require("razorpay");
const { sendNotification } = require("./notification.controller");
const { ObjectId } = require("mongoose").Types;

let instance = new razorpay({
    key_id: process.env.RAZORPAY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});

exports.CalculateAmountToPay = asyncHandler(async (req, res) => {
    const data = await dataModel.find();
    if (!data || data.length === 0) {
        return res
            .status(500)
            .json(
                new apiResponse(
                    500,
                    null,
                    "Server error: Missing configuration data",
                ),
            );
    }

    const { gstPercentage, gstIsActive } = data[0];
    let deliveryCharges = data[0].deliveryCharges;
    const { userId, code } = req.body;

    // Find the user's cart
    const cart = await Cart.findOne({ userId });
    if (!cart || cart.cartItems.length === 0) {
        return res
            .status(400)
            .json(new apiResponse(400, null, "Your cart is empty."));
    }

    // Calculate the subtotal (total product cost) from cartItems
    const subtotal = (
        await Promise.all(
            cart.cartItems.map(async (item) => {
                const product = await productModel.findById(item.productId); // Assuming `dishModel` is for Product
                return item.price * item.quantity;
            }),
        )
    ).reduce((total, price) => total + price, 0);

    // Calculate GST
    let gstAmount = 0;
    if (gstIsActive) {
        gstAmount = (subtotal * gstPercentage) / 100;
    }

    // Remove delivery charges calculation
    // const deliveryCharges = 0;

    // Remove platform fee calculation
    // const platformFee = 0;

    // Calculate the initial total amount to pay
    let totalAmountToPay = subtotal + gstAmount + deliveryCharges; //+ platformFee;

    let discount = 0;
    let promoCodeId = null;
    let promoCodeDetails = null;
    let promoCodeData;

    // If a promo code is provided, validate and apply it
    if (code) {
        const promoCode = await promoCodeModel.findOne({ code });
        if (!promoCode || !promoCode.isActive) {
            throw new apiError(400, "Invalid promo code");
        }
        if (
            moment(promoCode.expiry, "DD-MM-YYYY").isBefore(
                moment(),
                "DD-MM-YYYY",
            )
        ) {
            throw new apiError(400, "Promo code expired");
        }
        if (subtotal < promoCode.minOrderAmount) {
            throw new apiError(
                400,
                "Order total needs to be greater than the minimum order amount",
            );
        }

        switch (promoCode.codeType) {
            case 1: // FREE_DELIVERY
                discount = deliveryCharges;
                promoCodeDetails = "FREE_DELIVERY";
                totalAmountToPay -= deliveryCharges;
                deliveryCharges = 0;
                break;
            case 2: // GET_OFF
                discount = promoCode.discountAmount;
                promoCodeDetails = "GET_OFF";
                totalAmountToPay -= promoCode.discountAmount;
                break;
            case 3: // NEW_USER
                const userOrderExist = await Order.findOne({ userId });
                if (userOrderExist) {
                    throw new apiError(
                        400,
                        "This code is only valid on the first order",
                    );
                }
                discount = promoCode.discountAmount;
                promoCodeDetails = "NEW_USER";
                totalAmountToPay -= promoCode.discountAmount;
                break;
            default:
                throw new apiError(400, "Invalid promo code type");
        }

        promoCodeId = promoCode._id;
        promoCodeData = promoCode;
    }

    // Adjust totalAmountToPay in case it goes negative
    if (totalAmountToPay < 0) {
        totalAmountToPay = 0;
    }

    // Construct the detailed breakdown
    const breakdown = {
        subtotal,
        gstAmount,
        deliveryCharges,
        // platformFee,
        discount,
        totalAmountToPay: Number(totalAmountToPay.toFixed(2)),
        promoCodeId,
        promoCodeDetails: promoCodeData,
    };

    // Return the calculated amounts and breakdown
    return res
        .status(200)
        .json(
            new apiResponse(200, breakdown, "Amount calculated successfully"),
        );
});

exports.initiatePayment = asyncHandler(async (req, res, next) => {
    const { amount } = req.body;
    if (!amount) {
        return res
            .status(400)
            .json(new apiResponse(400, null, "AMOUNT_REQUIRED_FOR_PAYMENT"));
    }
    let options = {
        amount: amount,
        currency: "INR",
    };
    instance.orders.create(options, function (err, order) {
        if (err) {
            throw new apiError(400, err.message);
        }
        return res
            .status(201)
            .json(
                new apiResponse(201, order, "PAYMENT_INITIATED_SUCCESSFULLY"),
            );
    });
});

exports.placeOrder = asyncHandler(async (req, res) => {
    const { userId, addressId, phoneNumber, priceDetails, paymentId } =
        req.body;

    // Generate UUIDv4
    const uuid = uuidv4();
    // Convert UUID to uppercase
    const uppercaseUuid = uuid.toUpperCase();
    // Extract first 6 characters
    const orderIdPrefix = uppercaseUuid.substring(0, 6);

    // Find the user's cart
    const cart = await Cart.findOne({ userId });
    if (!cart || cart.cartItems.length === 0) {
        return res
            .status(400)
            .json(new apiResponse(400, null, "Cart is empty"));
    }

    const newOrder = await Order.create({
        orderId: orderIdPrefix,
        userId,
        addressId,
        phoneNumber,
        orderItems: cart.cartItems,
        priceDetails,
        promoCode: priceDetails.promoCodeId,
        paymentId,
        orderTimeline: [
            {
                title: "Order Placed",
                status: "PENDING",
                dateTime: moment().format("MMMM Do YYYY, h:mm:ss a"),
            },
        ],
    });
    sendNotification(newOrder.userId, "New Order", newOrder); // send notification to hotel owner

    // Clear the cart
    await cart.updateOne({
        $set: {
            cartItems: [],
            TotalItems: 0,
            SubTotal: 0,
        },
    });

    return res
        .status(200)
        .json(new apiResponse(200, newOrder, "ORDER PLACED SUCCESSFULLY"));
});
exports.CancelOrder = async (req, res) => {
    try {
        const savedOrder = await Order.findOne({ userId: req.params.userId });
        if (!savedOrder) {
            return res
                .status(404)
                .json({ message: "Orders Not Found", statusCode: 404 });
        }
        savedOrder.isCancel = true != undefined ? true : savedOrder.isCancel;
        const updatedOrder = await savedOrder.save();
        const refundObj = {
            userId: savedOrder._id,
            orderId: savedOrder.OrderId,
            description: req.body.description,
        };
        await Refund.create(refundObj);
        res.status(200).json({
            message: `Order Cancel  Successfully You Will Get refund In 3-7 Business Days`,
            statusCode: 200,
        });
    } catch (error) {
        res.status(500).json({
            Message: error.message,
            statusCode: 500,
            status: "ERROR",
        });
    }
};

exports.UpdateOrderDeliveryStatus = async (req, res) => {
    try {
        const savedOrder = await Order.findOne({ _id: req.params.orderId });
        if (!savedOrder) {
            return res
                .status(404)
                .json({ message: "Orders Not Found", statusCode: 404 });
        }
        savedOrder.isDelivered =
            req.body.isDelivered != undefined
                ? req.body.isDelivered
                : savedOrder.isDelivered;

        const updatedOrder = await savedOrder.save();
        res.status(200).json({
            message: "Order Delivery Status Updated Successfully",
            statusCode: 200,
            data: updatedOrder,
        });
    } catch (error) {
        res.status(500).json({
            Message: error.message,
            statusCode: 500,
            status: "ERROR",
        });
    }
};

exports.getAllOrders = asyncHandler(async (req, res) => {
    let dbQuery = {};
    const {
        pageNumber = 1,
        pageSize = 10,
        q,
        startDate,
        populate,
        status,
        userId,
    } = req.query;
    const endDate = req.query.endDate || moment().format("YYYY-MM-DD");
    const skip = (Number(pageNumber) - 1) * Number(pageSize);

    // Search based on user query
    if (q) {
        dbQuery = {
            $or: [{ orderId: { $regex: `^${q}`, $options: "i" } }],
        };
    }

    // Sort by date range
    if (startDate) {
        const sDate = new Date(startDate);
        const eDate = new Date(endDate);
        sDate.setHours(0, 0, 0, 0);
        eDate.setHours(23, 59, 59, 999);
        dbQuery.createdAt = {
            $gte: sDate,
            $lte: eDate,
        };
    }

    //sort by status
    if (status) {
        dbQuery.status = Number(status);
    }

    //sort by userId
    if (userId) {
        dbQuery.userId = new ObjectId(userId);
    }

    const dataCount = await Order.countDocuments(dbQuery);
    const orders = await Order.find(dbQuery)
        .populate({
            path: "userId",
            select: "name email phoneNo",
        })
        .populate({ path: "addressId", select: "-createdAt -updatedAt -__v" })
        .populate({
            path: "orderItems.productId", // Populate productId inside orderItems
            select: "-createdAt -updatedAt -__v", // Specify which fields to remove from the Product model
            populate: [
                {
                    path: "CategoryId",
                    select: "name image description isTopCategory",
                },
                {
                    path: "subCategoryId",
                    select: "name description", // Specify which fields to select from the Category model
                },
                {
                    path: "productCategoryId",
                    select: "name description",
                },
            ],
        });
    const startItem = skip + 1;
    const endItem = Math.min(
        startItem + pageSize - 1,
        startItem + orders.length - 1,
    );
    const totalPages = Math.ceil(dataCount / pageSize);
    return res.status(200).json(
        new apiResponse(
            200,
            {
                content: orders,
                startItem,
                endItem,
                totalPages,
                pagesize: orders.length,
                totalDoc: dataCount,
            },
            "ORDER_FETCHED_SUCCESSFULLY",
        ),
    );
});

exports.getOrdersById = async (req, res) => {
    try {
        const savedOrder = await Order.findOne({ _id: req.params.Id }).populate(
            "orderItems.productId",
        );
        if (savedOrder.length == 0) {
            return res
                .status(404)
                .json({ message: "Orders Not Found", statusCode: 404 });
        }
        res.status(200).json({
            message: "All Order Fetched Successfully",
            statusCode: 200,
            data: savedOrder,
        });
    } catch (error) {
        res.status(500).json({
            Message: error.message,
            statusCode: 500,
            status: "ERROR",
        });
    }
};

exports.getOrdersByOrderId = async (req, res) => {
    try {
        const savedOrder = await Order.findOne({
            OrderId: req.params.orderId,
        }).populate("orderItems.productId");
        if (savedOrder.length == 0) {
            return res
                .status(404)
                .json({ message: "Orders Not Found", statusCode: 404 });
        }
        res.status(200).json({
            message: "All Order Fetched Successfully",
            statusCode: 200,
            data: savedOrder,
        });
    } catch (error) {
        res.status(500).json({
            Message: error.message,
            statusCode: 500,
            status: "ERROR",
        });
    }
};

exports.getOrdersByDeliveryStatus = async (req, res) => {
    try {
        const savedOrder = await Order.find({
            isDelivered: req.query.isDelivered,
        });
        if (savedOrder.length == 0) {
            return res
                .status(404)
                .json({ message: "Orders Not Found", statusCode: 404 });
        }
        res.status(200).json({
            message: "All Order Fetched Successfully",
            statusCode: 200,
            data: savedOrder,
        });
    } catch (error) {
        res.status(500).json({
            Message: error.message,
            statusCode: 500,
            status: "ERROR",
        });
    }
};

exports.getOrdersByUserId = async (req, res) => {
    try {
        const savedOrder = await Order.find({
            userId: req.params.userId,
        }).populate({
            path: "orderItems.productId",
            select: [
                "-__v",
                "-updatedAt",
                "-createdAt",
                "-isTopProduct",
                "-isTrendingProduct",
            ],
        });
        if (savedOrder.length == 0) {
            return res
                .status(404)
                .json({ message: "Orders Not Found", statusCode: 404 });
        }
        res.status(200).json({
            message: "All Order Fetched Successfully",
            statusCode: 200,
            data: savedOrder,
        });
    } catch (error) {
        res.status(500).json({
            Message: error.message,
            statusCode: 500,
            status: "ERROR",
        });
    }
};

exports.deleteOrders = async (req, res) => {
    try {
        const savedOrder = await Order.findOne({ _id: req.params.Id });
        if (!savedOrder) {
            return res
                .status(404)
                .json({ message: "Orders Not Found", statusCode: 404 });
        }
        await savedOrder.deleteOne({ _id: req.params.Id });
        res.status(200).json({
            message: "Order Deleted Successfully",
            statusCode: 200,
        });
    } catch (error) {
        res.status(500).json({
            Message: error.message,
            statusCode: 500,
            status: "ERROR",
        });
    }
};

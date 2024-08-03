const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OrderSchema = new Schema(
    {
        orderId: {
            type: String,
            require: [true, "OrderId Is Require"],
        },
        userId: {
            type: String,
            require: [true, "UserId Is Require"],
            ref: "User",
        },
        AddressId: {
            type: String,
            require: [true, "AddressId Is Require"],
            ref: "UserAddress",
        },
        phoneNumber: {
            type: String,
            require: [true, "PhoneNumber Is Require"],
        },
        orderItems: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: "Product",
                },
                size: {
                    type: String,
                },
                quantity: {
                    type: Number,
                    default: 0,
                },
                price: {
                    type: Number,
                    default: 0,
                },
            },
        ],
        status: {
            type: Number,
            enum: [
                0, // "Pending",
                1, // "Confirm",
                2, // "In-Transit",
                3, //  "Completed" ,
                4, // "Cancel",
            ],
            default: 0,
        },
        promoCode: {
            type: Schema.Types.ObjectId,
            ref: "PromoCode",
        },
        paymentId: {
            type: String,
        },
        priceDetails: {
            subtotal: {
                type: Number,
                required: true,
            },
            gstAmount: {
                type: Number,
                required: true,
            },
            deliveryCharges: {
                type: Number,
                required: true,
            },
            discount: {
                type: Number,
                required: true,
            },
            totalAmountToPay: {
                type: Number,
                required: true,
            },
        },
        orderTimeline: {
            type: [
                {
                    title: String,
                    dateTime: String,
                    status: String,
                },
            ],
        },
        orderDeliveredOtp: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model("Order", OrderSchema);

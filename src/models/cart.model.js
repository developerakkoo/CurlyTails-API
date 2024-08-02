const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CarSchema = new Schema(
    {
        userId: {
            type: String,
            require: [true, "Title Is Require"],
        },
        cartItems: [
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
        TotalItems: {
            type: Number,
            default: 0,
        },
        SubTotal: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model("Cart", CarSchema);

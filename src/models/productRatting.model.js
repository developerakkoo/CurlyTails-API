const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productRattingSchema = new Schema(
    {
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        description: {
            type: String,
            required: true,
            default: null,
        },
        images: {
            type: [String],
        },
        star: {
            type: Number,
            required: true,
            enum: [1, 2, 3, 4, 5],
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model("productRatting", productRattingSchema);

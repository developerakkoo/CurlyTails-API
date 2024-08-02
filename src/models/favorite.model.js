const { Schema, model } = require("mongoose");

const favoriteSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
        },
    },
    { timestamps: true },
);

module.exports = model("Favorite", favoriteSchema);

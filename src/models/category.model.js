const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const categorySchema = new Schema(
    {
        name: {
            type: String,
            require: true,
            unique: true,
        },
        image: {
            type: String,
        },
        localPath: {
            type: String,
        },
        description: {
            type: String,
            require: true,
        },
        isTopCategory: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model("Category", categorySchema);

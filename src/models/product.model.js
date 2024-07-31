const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    CategoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    subCategoryId: {
      type: Schema.Types.ObjectId,
      ref: "subCategory",
    },
    productCategoryId: {
      type: Schema.Types.ObjectId,
      ref: "productCategory",
    },
    name: {
      type: String,
      required: true,
      index: true,
    },
    brand: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      index: true,
    },
    LifeStage: {
      type: String,
      required: true,
    },
    BreedSize: {
      type: String,
      required: true,
    },
    flavor: {
      type: String,
      required: true,
    },
    vegNonVeg: {
      type: String,
      required: true,
    },
    quantities: [
      {
        size: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    images: {
      type: Array,
      default: [],
    },
    isTrendingProduct: {
      type: Boolean,
      default: false,
    },
    isTopProduct: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = model("Product", productSchema);

const productRatting = require("../models/productRatting.model");
const productModel = require("../models/product.model");
const {
    asyncHandler,
    apiError,
    apiResponse,
} = require("../utils/helper.utils");

exports.postProductRatting = asyncHandler(async (req, res) => {
    const { productId, userId, description, star } = req.body;
    const images = req.files
        ? req.files.map(
              (file) => `https://${req.hostname}/upload/${file.filename}`,
          )
        : [];
    const product = await productModel.findById(productId);
    if (!product) {
        throw new apiError(404, "Product Not Found");
    }

    const checkStarExistByUser = await productRatting.findOne({
        productId,
        userId,
    });
    if (checkStarExistByUser?.userId.toString() == userId) {
        throw new apiError(400, "Already Stared product");
    }
    const hotelStar = await productRatting.create({
        productId,
        userId,
        description,
        star,
        images,
    });
    res.status(201).json(
        new apiResponse(201, hotelStar, "Star Added Successfully"),
    );
});

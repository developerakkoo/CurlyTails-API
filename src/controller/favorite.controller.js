const Favorite = require("../models/favorite.model");
const { asyncHandler, sendResponse } = require("../utils/helper.utils");

exports.addToFavorites = asyncHandler(async (req, res) => {
    const { userId, productId } = req.body;

    // Check if the product is already in favorites
    const existingFavorite = await Favorite.findOne({ userId, productId });
    if (existingFavorite) {
        return sendResponse(res, 400, null, "Product is already in favorites");
    }

    // Add to favorites
    const newFavorite = await Favorite.create({ userId, productId });

    sendResponse(res, 201, newFavorite, "Product added to favorites");
});

exports.removeFromFavorites = asyncHandler(async (req, res) => {
    const { userId, productId } = req.body;

    // Remove from favorites
    const result = await Favorite.deleteOne({ userId, productId });
    if (result.deletedCount === 0) {
        return sendResponse(res, 404, nul, "Product not found in favorites");
    }
    sendResponse(res, 200, null, "Product removed from favorites");
});

exports.getFavoriteProducts = asyncHandler(async (req, res) => {
    const { userId } = req.query;

    // Get all favorite products for the user
    const favorites = await Favorite.find({ userId }).populate("productId");
    sendResponse(res, 200, favorites, "Favorite products fetched successfully");
});

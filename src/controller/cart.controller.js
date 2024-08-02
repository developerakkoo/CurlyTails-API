const Cart = require("../models/cart.model");
const Product = require("../models/product.model");
const { getIO } = require("../socket");
const { asyncHandler, sendResponse } = require("../utils/helper.utils");

exports.addToCart = asyncHandler(async (req, res) => {
    const { userId, productId, size, quantity } = req.body;

    // Find the product
    const product = await Product.findById(productId);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    // Find the price for the given size
    const productPrice = product.quantities.find((q) => q.size === size)?.price;
    if (productPrice === undefined) {
        return res.status(404).json({ message: "Product size not found" });
    }

    // Find the cart for the user
    let cart = await Cart.findOne({ userId });
    if (!cart) {
        cart = new Cart({ userId });
    }

    // Check if the item already exists in the cart
    const itemIndex = cart.cartItems.findIndex(
        (item) => item.productId.toString() === productId && item.size === size
    );

    if (itemIndex > -1) {
        // Update existing item
        cart.cartItems[itemIndex].quantity += quantity;
    } else {
        // Add new item
        cart.cartItems.push({ productId, size, quantity, price: productPrice });
    }

    // Update total items and subtotal
    cart.TotalItems = cart.cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );
    cart.SubTotal = cart.cartItems.reduce(
        (total, item) => total + item.price * item.quantity, // Calculate subtotal correctly
        0
    );

    await cart.save();
    sendResponse(res, 200, cart, "Item added to cart successfully");
});


exports.removeFromCart = asyncHandler(async (req, res) => {
    const { userId, productId, size } = req.body;

    // Find the cart for the user
    const cart = await Cart.findOne({ userId });
    if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
    }

    // Find the index of the item in the cart
    const itemIndex = cart.cartItems.findIndex(
        (item) => item.productId.toString() === productId && item.size === size
    );

    if (itemIndex === -1) {
        return res.status(404).json({ message: "Item not found in cart" });
    }

    // Get the item price
    const itemPrice = cart.cartItems[itemIndex].price;

    // Decrement the quantity of the item
    if (cart.cartItems[itemIndex].quantity > 1) {
        cart.cartItems[itemIndex].quantity -= 1;
    } else {
        // Remove the item if the quantity is 1
        cart.cartItems.splice(itemIndex, 1);
    }

    // Update total items and subtotal
    cart.TotalItems = cart.cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );
    cart.SubTotal = cart.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const updatedCart = await cart.save();
    sendResponse(res, 200, updatedCart, "Item quantity updated successfully");
});


exports.clearCart = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    // Find the cart for the user
    const cart = await Cart.findOne({ userId });
    if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
    }

    // Clear the cart
    cart.cartItems = [];
    cart.TotalItems = 0;
    cart.SubTotal = 0;

    await cart.save();
    sendResponse(res, 200, cart, "Cart cleared successfully");
});

exports.getCart = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    // Find the cart for the user
    const cart = await Cart.findOne({ userId }).populate({
        path: "cartItems.productId",
        // select: "name brand description price", // Specify which fields to include from Product
    });
    if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
    }
    sendResponse(res, 200, cart, "Cart fetched successfully");
});

const Cart = require("../models/cart.model");
const { getIO } = require("../socket");

exports.addToCart = async (req, res) => {
  try {
    const savedCart = await Cart.findOne({ userId: req.params.userId });
    if (!savedCart) {
      return res.status(404).json({
        message: `Cart Not Found With This UserId:${req.params.userId}`,
        statusCode: 404,
      });
    }
    // console.log(savedCart.cartItems.length);
    let updatedCart;
    if (!savedCart.cartItems.length == 0) {
      // console.log('if>>');
      for (let itemNo = 0; itemNo < savedCart.cartItems.length; itemNo++) {
        // console.log(savedCart.cartItems[itemNo].productId)
        // console.log(savedCart.cartItems.length);
        // console.log(itemNo);
        if (savedCart.cartItems[itemNo].productId == req.body.productId) {
          savedCart.cartItems[itemNo].quantity += req.body.quantity;

          savedCart.TotalItems = savedCart.TotalItems +=
            req.body.quantity != undefined
              ? req.body.quantity
              : savedCart.TotalItems;

          savedCart.SubTotal = savedCart.SubTotal +=
            req.body.price * req.body.quantity != undefined
              ? req.body.price * req.body.quantity
              : savedCart.SubTotal;
          // console.log(savedCart.cartItems[itemNo]);
          updatedCart = await savedCart.save();
          getIO().emit("cart:get", { data: updatedCart });
          return res.status(201).json({
            message: "Product Added To Cart Successfully",
            statusCode: 201,
            data: updatedCart,
          });
        }
      }
    }
    // console.log('else>>');
    savedCart.cartItems.push({
      productId: req.body.productId,
      quantity: req.body.quantity,
      price: req.body.price,
    });
    savedCart.TotalItems = savedCart.TotalItems +=
      req.body.quantity != undefined ? req.body.quantity : savedCart.TotalItems;

    savedCart.SubTotal = savedCart.SubTotal +=
      req.body.price * req.body.quantity != undefined
        ? req.body.price * req.body.quantity
        : savedCart.SubTotal;
    updatedCart = await savedCart.save();
    getIO().emit("cart:get", { data: updatedCart });
    res.status(201).json({
      message: "Product Added To Cart Successfully",
      statusCode: 201,
      data: updatedCart,
    });
  } catch (error) {
    console.log();
    res
      .status(500)
      .json({ message: error.message, statusCode: 500, status: "ERROR" });
  }
};

exports.updateCartProductQuantity = async (req, res) => {
  try {
    const savedCart = await Cart.findOne({ userId: req.params.userId });
    if (!savedCart) {
      return res.status(404).json({
        message: `Cart Not Found With This UserId:${req.params.userId}`,
        statusCode: 404,
      });
    }
    let updatedCart;
    if (req.body.updateQuantity == true) {
      for (let itemNo = 0; itemNo < savedCart.cartItems.length; itemNo++) {
        // console.log(savedCart.cartItems[itemNo].productId)
        // console.log(savedCart.cartItems.length);
        // console.log(itemNo);

        if (savedCart.cartItems[itemNo].productId == req.body.productId) {
          savedCart.cartItems[itemNo].quantity -= req.body.quantity;

          savedCart.TotalItems = savedCart.TotalItems -=
            req.body.quantity != undefined
              ? req.body.quantity
              : savedCart.TotalItems;

          savedCart.SubTotal = savedCart.SubTotal -=
            req.body.price * req.body.quantity != undefined
              ? req.body.price * req.body.quantity
              : savedCart.SubTotal;
          if (savedCart.cartItems[itemNo].quantity === 0) {
            let itemToBeRemoved = savedCart.cartItems[itemNo].toString();
            savedCart.cartItems.splice(
              savedCart.cartItems.findIndex((a) => a.id === itemToBeRemoved),
              1
            );
            // savedCart.cartItems = savedCartItems;
            updatedCart = await savedCart.save();
            getIO().emit("cart:update", { data: updatedCart });
            return res.status(201).json({
              message: "Product Deleted From Cart Successfully",
              statusCode: 201,
              data: updatedCart,
            });
          }
          // console.log(savedCart.cartItems[itemNo]);
          updatedCart = await savedCart.save();
          getIO().emit("cart:update", { data: updatedCart });
          return res.status(201).json({
            message: "Product Remove From Cart Successfully",
            statusCode: 201,
            data: updatedCart,
          });
        }
      }
    }
    return res.status(404).json({
      message: "Product Not Found With This Product Id",
      statusCode: 404,
      productId: req.body.productId,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: error.message, statusCode: 500, status: "ERROR" });
  }
};

exports.deleteProductFromCart = async (req, res) => {
  try {
    const savedCart = await Cart.findOne({ userId: req.params.userId });
    if (!savedCart) {
      return res.status(404).json({
        message: `Cart Not Found With This UserId:${req.params.userId}`,
        statusCode: 404,
      });
    }
    const result = savedCart.cartItems.filter(
      (product) =>
        !req.body.productId.some(
          (id) => id.toString() === product.productId.toString()
        )
    );
    if (result.length == 0) {
      return res.status(404).json({
        msg: `Product Not Found With This ProductId:${req.body.productId}`,
      });
    }
    let total = (savedCart.TotalItems -= result[0].quantity);
    let itemToBeRemoved = req.body.productId.toString();
    savedCart.TotalItems = total != undefined ? total : savedCart.TotalItems;

    savedCart.SubTotal = savedCart.SubTotal -=
      result[0].price * result[0].quantity != undefined
        ? result[0].price * result[0].quantity
        : savedCart.SubTotal;
    savedCart.cartItems.splice(
      savedCart.cartItems.findIndex((a) => a.id === itemToBeRemoved),
      1
    );
    updatedCart = await savedCart.save();
    getIO().emit("cart:delete", { data: updatedCart });
    res.status(200).json({
      msg: "Product Removed From Cart",
      statusCode: 200,
      data: updatedCart,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: error.message, statusCode: 500, status: "ERROR" });
  }
};

exports.getAllCarts = async (req, res) => {
  try {
    const savedCart = await Cart.find().select("-__v");
    if (savedCart.length == 0) {
      return res
        .status(404)
        .json({ message: "Carts Not Found", statusCode: 404 });
    }
    res.status(200).json({
      message: "All Carts Fetched Successfully",
      statusCode: 200,
      length: savedCart.length,
      data: savedCart,
    });
  } catch (error) {
    console.log();
    res
      .status(500)
      .json({ message: error.message, statusCode: 500, status: "ERROR" });
  }
};

exports.getCartById = async (req, res) => {
  try {
    const savedCart = await Cart.findOne({ _id: req.params.cartId })
      .select("-__v")
      .populate({
        path: "cartItems.productId", // populating product Id
        select: ("-__v", "-updatedAt"),
      });
    if (!savedCart) {
      return res.status(404).json({
        message: `Cart Not Found With This cartId:${req.params.cartId}`,
        statusCode: 404,
      });
    }
    res.status(200).json({
      message: "Cart Fetched Successfully",
      statusCode: 200,
      data: savedCart,
    });
  } catch (error) {
    console.log();
    res
      .status(500)
      .json({ message: error.message, statusCode: 500, status: "ERROR" });
  }
};

exports.getCartByUserId = async (req, res) => {
  try {
    const savedCart = await Cart.findOne({ userId: req.params.userId })
      .select("-__v")
      .populate({
        path: "cartItems.productId", // populating product Id
        select: ("-__v", "-updatedAt"),
      });
    if (!savedCart) {
      return res.status(404).json({
        message: `Cart Not Found With This userId:${req.params.userId}`,
        statusCode: 404,
      });
    }
    res.status(200).json({
      message: "Cart Fetched Successfully",
      statusCode: 200,
      data: savedCart,
    });
  } catch (error) {
    console.log();
    res
      .status(500)
      .json({ message: error.message, statusCode: 500, status: "ERROR" });
  }
};

const User = require("../models/user.model");
const Cart = require("../models/cart.model");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.postSignup = async (req, res, next) => {
  try {
    const userData = {
      name: req.body.name,
      email: req.body.email,
      phoneNo: req.body.phoneNo,
      password: await bcrypt.hash(req.body.password, 12),
      address: req.body.address,
    };
    const createdUser = await User.create(userData);
    const cartObj = {
      userId: createdUser._id,
    };
    await Cart.create(cartObj);
    const postRes = {
      userId: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      phoneNo: createdUser.phoneNo,
      address: createdUser.address,
    };
    res
      .status(201)
      .json({
        message: "User Created Successfully",
        statusCode: 200,
        data: postRes,
      });
  } catch (error) {
    if (error.code == 11000) {
      return res
        .status(406)
        .json({
          message: `User With This  Email Or Phone Number Is Already Exist Please Try With Different  Email Or Phone Number`,
        });
    }
    res
      .status(500)
      .send({ message: error.message, statusCode: 500, status: "ERROR" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const savedUser = await User.findOne({ email: email });
    if (!savedUser) {
      return res
        .status(404)
        .json({
          message: `User not found with this email ${req.body.email}`,
          statusCode: 404,
        });
    }
    if (!(await bcrypt.compare(password, savedUser.password))) {
      return res
        .status(401)
        .json({ message: `Incorrect Password`, statusCode: 401 });
    }
    const payload = {
      userId: savedUser._id,
      email: savedUser.email,
    };
    const token = await jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "24h",
    });
    const postRes = {
      User: savedUser.name,
      Id: savedUser._id,
      accessToken: token,
    };
    res
      .status(200)
      .json({
        message: `User login successfully`,
        statusCode: 200,
        data: postRes,
      });
  } catch (error) {
    res
      .status(500)
      .json({ Message: error.message, status: "ERROR", statusCode: 500 });
  }
};

exports.UpdateUsers = async (req, res) => {
  try {
    console.log("here");
    const savedUser = await User.findOne({ _id: req.params.userId });
    if (!savedUser) {
      return res
        .status(404)
        .json({ message: "User Not Found", statusCode: 404 });
    }
    savedUser.name =
      req.body.name != undefined ? req.body.name : savedUser.name;

    savedUser.email =
      req.body.email != undefined ? req.body.email : savedUser.email;

    savedUser.phoneNo =
      req.body.phoneNo != undefined ? req.body.phoneNo : savedUser.phoneNo;

    savedUser.address =
      req.body.address != undefined ? req.body.address : savedUser.address;

    savedUser.isActive =
      req.body.isActive != undefined ? req.body.isActive : savedUser.isActive;

    savedUser.isBlock =
      req.body.isBlock != undefined ? req.body.isBlock : savedUser.isBlock;

    const updatedUser = await savedUser.save();

    res
      .status(201)
      .json({
        message: "User Updated Successfully",
        statusCode: 201,
        data: updatedUser,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message, statusCode: 500, status: "ERROR" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const savedUser = await User.find().select("-password");
    if (savedUser.length == 0) {
      return res
        .status(404)
        .json({ message: "Users Not Found", statusCode: 404 });
    }
    res
      .status(200)
      .json({
        message: "Users Fetched Successfully",
        statusCode: 200,
        length: savedUser.length,
        data: savedUser,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message, statusCode: 500, status: "ERROR" });
  }
};

exports.getUsersById = async (req, res) => {
  try {
    const savedUser = await User.findOne({ _id: req.params.userId }).select(
      "-password"
    );
    if (!savedUser) {
      return res
        .status(404)
        .json({ message: "User Not Found", statusCode: 404 });
    }
    res
      .status(200)
      .json({
        message: "User Fetched Successfully",
        statusCode: 200,
        data: savedUser,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message, statusCode: 500, status: "ERROR" });
  }
};

exports.deleteUsers = async (req, res) => {
  try {
    const savedUser = await User.findOne({ _id: req.params.userId });
    if (!savedUser) {
      return res
        .status(404)
        .json({ message: "User Not Found", statusCode: 404 });
    }
    await savedUser.deleteOne({ _id: req.params.userId });
    res
      .status(200)
      .json({ message: "User Deleted Successfully", statusCode: 200 });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message, statusCode: 500, status: "ERROR" });
  }
};

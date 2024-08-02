const User = require("../models/user.model");
const userAddress = require("../models/userAddress.model");
const Cart = require("../models/cart.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
    sendResponse,
    asyncHandler,
    apiError,
} = require("../utils/helper.utils");

exports.postSignup = asyncHandler(async (req, res, next) => {
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
    sendResponse(res, 201, postRes, "User Created Successfully");
});

exports.loginUser = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const savedUser = await User.findOne({ email: email });
    if (!savedUser) {
        return sendResponse(
            res,
            404,
            null,
            `User not found with this email ${req.body.email}`,
        );
    }
    if (!(await bcrypt.compare(password, savedUser.password))) {
        return sendResponse(res, 401, null`Incorrect Password`);
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
    sendResponse(res, 200, postRes, `User login successfully`);
});

exports.UpdateUsers = asyncHandler(async (req, res) => {
    const savedUser = await User.findOne({ _id: req.params.userId });
    if (!savedUser) {
        return sendResponse(res, 404, null, "User Not Found");
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

    sendResponse(res, 201, updatedUser, "User Updated Successfully");
});

exports.getAllUsers = asyncHandler(async (req, res) => {
    const savedUser = await User.find().select("-password");
    if (savedUser.length == 0) {
        return sendResponse(res, 404, null, "Users Not Found");
    }
    res.status(200).json({
        message: "Users Fetched Successfully",
        statusCode: 200,
        length: savedUser.length,
        data: savedUser,
    });
});

exports.getUsersById = asyncHandler(async (req, res) => {
    const savedUser = await User.findOne({ _id: req.params.userId }).select(
        "-password",
    );
    if (!savedUser) {
        return sendResponse(res, 404, null, "User Not Found");
    }
    sendResponse(res, 200, savedUser, "User Fetched Successfully");
});

exports.deleteUsers = asyncHandler(async (req, res) => {
    const savedUser = await User.findOne({ _id: req.params.userId });
    if (!savedUser) {
        return sendResponse(res, 404, null, "User Not Found");
    }
    await savedUser.deleteOne({ _id: req.params.userId });
    res.status(res, 200, null, "User Deleted Successfully");
});

/* Address */

exports.addAddresses = asyncHandler(async (req, res) => {
    const { type, address, selected, lng, lat } = req.body;
    const savedAddress = await userAddress.create({
        userId: req.query.userId || req.user._id,
        type,
        address,
        selected,
        location: {
            type: "Point",
            coordinates: [lng, lat],
        },
    });

    return sendResponse(res, 201, savedAddress, "Address saved successfully");
});

exports.selectAddresses = asyncHandler(async (req, res) => {
    const { addressId, selected } = req.body;
    const selectedAddress = await userAddress.findByIdAndUpdate(
        addressId,
        {
            $set: {
                selected: selected,
            },
        },
        {
            new: true,
        },
    );

    return sendResponse(
        res,
        200,
        selectedAddress,
        "Address selected successfully",
    );
});

exports.getAllAddressesByUserId = asyncHandler(async (req, res) => {
    const userId = req.params.userId || req.user._id;
    const userAddresses = await userAddress.find({ userId: userId });
    return sendResponse(
        res,
        200,
        userAddresses,
        "Address fetched successfully",
    );
});

exports.getAddressesById = asyncHandler(async (req, res) => {
    const { addressId } = req.params;
    const userAddresses = await userAddress.findById(addressId);
    return sendResponse(
        res,
        200,
        userAddresses,
        "Address fetched successfully",
    );
});

exports.updateAddress = asyncHandler(async (req, res) => {
    const { addressId } = req.body;
    const savedAddress = await userAddress.findById(addressId);
    if (!savedAddress) {
        throw new apiError(404, "Address not found");
    }
    savedAddress.type =
        req.body.type != undefined ? req.body.type : savedAddress.type;
    savedAddress.address =
        req.body.address != undefined ? req.body.address : savedAddress.address;
    savedAddress.selected =
        req.body.selected != undefined
            ? req.body.selected
            : savedAddress.selected;
    const updatedAddress = await savedAddress.save();

    return sendResponse(
        res,
        200,
        updatedAddress,
        "Address updated successfully",
    );
});

exports.deleteAddress = asyncHandler(async (req, res) => {
    const { addressId } = req.params;
    const savedAddress = await userAddress.findById(addressId);
    if (!savedAddress) {
        throw new apiError(404, "Address not found");
    }
    if (savedAddress.userId.toString() != req.user._id.toString()) {
        throw new apiError(
            400,
            "Address not deleted, you can only delete your address",
        );
    }
    await userAddress.deleteOne({ _id: addressId });
    return sendResponse(res, 200, {}, "Address deleted successfully");
});

// exports.fetchAddress = asyncHandler(async (req, res) => {
//     const { address } = req.body;
//     if (!address) {
//         return sendResponse(res, 400, null, "Address is required");
//     }
//     const response = await axios.get(
//         "https://maps.googleapis.com/maps/api/geocode/json",
//         {
//             params: {
//                 address: address,
//                 key: process.env.GOOGLE_MAPS_API_KEY,
//             },
//         },
//     );

//     const results = response.data.results;
//     if (results.length === 0) {
//         return sendResponse(res, 404, null, "No addresses found");
//     }
//     sendResponse(
//         res,
//         200,
//         results.map((result) => ({
//             formatted_address: result.formatted_address,
//             location: result.geometry.location,
//         })),
//         "Address fetch successfully",
//     );
// });

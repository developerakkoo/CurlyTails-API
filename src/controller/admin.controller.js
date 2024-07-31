const Admin = require("../models/admin.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Category = require("../models/category.model");
const subCategory = require("../models/subCategory.model");
const productCategory = require("../models/productCategory.model");
const Product = require("../models/product.model");
const Refund = require("../models/refund.model");
const Order = require("../models/order.model");
const { sendResponse, asyncHandler } = require("../utils/helper.utils");
require("dotenv").config();

exports.postSignup = asyncHandler(async (req, res, next) => {
    const adminData = {
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 12),
    };
    const checkAdmin = await Admin.findOne({ email: req.body.email });
    if (checkAdmin) {
        return sendResponse(
            res,
            406,
            null,
            `Admin Already Exist with Email ${req.body.email} Please With Different Email `,
        );
    }
    const createdAdmin = await Admin.create(adminData);
    postRes = {
        adminId: createdAdmin._id,
        email: createdAdmin.email,
    };
    sendResponse(res, 201, postRes, "Admin Created Successfully");
});

exports.AdminLogin = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const savedAdmin = await Admin.findOne({ email: email });
    if (!savedAdmin) {
        return sendResponse(
            res,
            404,
            null,
            `Admin Not Found With This Email ${req.body.email}`,
        );
    }
    if (!(await bcrypt.compare(password, savedAdmin.password))) {
        return sendResponse(res, 401, null, `Incorrect Password`);
    }
    const payload = {
        userId: savedAdmin._id,
        email: savedAdmin.email,
    };
    const token = await jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "24h",
    });
    const postRes = {
        Id: savedAdmin._id,
        User: savedAdmin.name,
        accessToken: token,
    };
    sendResponse(res, 200, postRes, `Admin login successfully`);
});

exports.updateAdmin = asyncHandler(async (req, res) => {
    const savedAdmin = await Admin.findOne({
        _id: req.params.adminId,
    }).select("-password");
    if (!savedAdmin) {
        return sendResponse(
            res,
            404,
            null,
            `Admin  Not Found With ID:${req.params.adminId}`,
        );
    }
    savedAdmin.name =
        req.body.name != undefined ? req.body.name : savedAdmin.name;
    savedAdmin.phoneNo =
        req.body.phoneNo != undefined ? req.body.phoneNo : savedAdmin.phoneNo;
    savedAdmin.email =
        req.body.email != undefined ? req.body.email : savedAdmin.email;

    const updatedAdmin = await savedAdmin.save();
    sendResponse(res, 201, updatedAdmin, "Admin Updated Successfully");
});

exports.getAdminById = asyncHandler(async (req, res) => {
    const savedAdmin = await Admin.findOne({
        _id: req.params.adminId,
    }).select("-password");
    if (!savedAdmin) {
        return sendResponse(
            res,
            404,
            null,
            `Admin  Not Found With ID:${req.params.adminId}`,
        );
    }

    sendResponse(res, 200, savedAdmin, "Admin Fetched Successfully");
});

exports.getAllAdmin = asyncHandler(async (req, res) => {
    const savedAdmin = await Admin.find().select("-password");
    if (savedAdmin.length == 0) {
        return sendResponse(res, 404, null, `Admins Not Found`);
    }
    sendResponse(res, 200, savedAdmin, "Admin Fetched Successfully");
});

// exports.getAllUserCount = async(req,res) =>{
//     try {
//         const savedUserCount = await User.count()
//         const savedProductCount = await Product.count()
//         const ProductCategoryCount = await productCategory.count()
//         const savedSubCategoryCount = await subCategory.count()
//         const savedCategoryCount = await Category.count()

//         res.status(200).json({message:'Data Fetched Successfully',statusCode:200,data:savedUserCount});
//     } catch (error) {
//         res.status(500).json({message:error.message,statusCode:500,status:'ERROR'});
//     }
// }

// exports.getAllCategoryCount = async(req,res) =>{
//     try {
//         const savedCategoryCount = await Category.count()
//         res.status(200).json({message:'Data Fetched Successfully',statusCode:200,data:savedCategoryCount});
//     } catch (error) {
//         res.status(500).json({message:error.message,statusCode:500,status:'ERROR'});
//     }
// }

// exports.getAllSubCategoryCount = async(req,res) =>{
//     try {
//         const savedSubCategoryCount = await subCategory.count()
//         res.status(200).json({message:'Data Fetched Successfully',statusCode:200,data:savedSubCategoryCount});
//     } catch (error) {
//         res.status(500).json({message:error.message,statusCode:500,status:'ERROR'});
//     }
// }

// exports.getAllProductCategoryCount = async(req,res) =>{
//     try {
//         const ProductCategoryCount = await productCategory.count()
//         res.status(200).json({message:'Data Fetched Successfully',statusCode:200,data:ProductCategoryCount});
//     } catch (error) {
//         res.status(500).json({message:error.message,statusCode:500,status:'ERROR'});
//     }
// }

// exports.getAllProductCount = async(req,res) =>{
//     try {
//         const savedProductCount = await Product.count()
//         res.status(200).json({message:'Data Fetched Successfully',statusCode:200,data:savedProductCount});
//     } catch (error) {
//         res.status(500).json({message:error.message,statusCode:500,status:'ERROR'});
//     }
// }

exports.deleteAdmin = async (req, res) => {
    try {
        const savedAdmin = await Admin.findOne({ _id: req.params.adminId });
        if (!savedAdmin) {
            return res.status(404).json({
                message: `Admin  Not Found With ID:${req.params.adminId}`,
                statusCode: 404,
            });
        }
        await savedAdmin.deleteOne({ _id: req.params.adminId });
        res.status(200).json({
            message: "Admin Deleted Successfully",
            statusCode: 200,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
            statusCode: 500,
            status: "ERROR",
        });
    }
};

exports.getAllRefundRequest = async (req, res) => {
    try {
        const pageNo = parseInt(req.query.page) || 1;
        const savedRefund = await Refund.find()
            .skip((pageNo - 1) * 10)
            .limit(10);
        res.status(200).json({
            message: "Refund Request Fetched Successfully",
            statusCode: 200,
            count: savedRefund.length,
            data: savedRefund,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
            statusCode: 500,
            status: "ERROR",
        });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const pageNo = parseInt(req.query.page) || 1;
        const savedOrder = await Order.find()
            .skip((pageNo - 1) * 10)
            .limit(10)
            .populate("userId")
            .populate("orderItems.productId");
        res.status(200).json({
            message: "All Order Fetched Successfully",
            statusCode: 200,
            count: savedOrder.length,
            data: savedOrder,
        });
    } catch (error) {
        res.status(500).json({
            Message: error.message,
            statusCode: 500,
            status: "ERROR",
        });
    }
};

exports.getAllCount = async (req, res) => {
    try {
        const pipelineMonth = [
            {
                $project: {
                    SubTotal: true,
                    createdAt: {
                        $month: "$createdAt",
                    },
                },
            },
            {
                $group: {
                    _id: {
                        month: "$createdAt",
                    },
                    total: {
                        $sum: "$SubTotal",
                    },
                },
            },
        ];
        const pipelineYear = [
            {
                $project: {
                    SubTotal: true,
                    createdAt: {
                        $year: "$createdAt",
                    },
                },
            },
            {
                $group: {
                    _id: {
                        year: "$createdAt",
                    },
                    total: {
                        $sum: "$SubTotal",
                    },
                },
            },
        ];
        const monthlyEarnings = await Order.aggregate(pipelineMonth).sort({
            createdAt: -1,
        });
        const yearlyEarnings = await Order.aggregate(pipelineYear);
        const savedUserCount = await User.count();
        const savedProductCount = await Product.count();
        const ProductCategoryCount = await productCategory.count();
        const savedSubCategoryCount = await subCategory.count();
        const savedCategoryCount = await Category.count();
        res.status(200).json({
            message: "Data Fetched Successfully",
            statusCode: 200,
            data: [
                { userCount: savedUserCount },
                { totalCategory: savedCategoryCount },
                { totalSubCategory: savedSubCategoryCount },
                { totalProductCategory: ProductCategoryCount },
                { totalProduct: savedProductCount },
                { monthlyEarnings: monthlyEarnings },
                { yearlyEarnings: yearlyEarnings },
            ],
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
            statusCode: 500,
            status: "ERROR",
        });
    }
};

exports.monthlyEarnings = async (req, res) => {
    try {
        const pipeline = [
            {
                $project: {
                    SubTotal: true,
                    createdAt: {
                        $month: "$createdAt",
                    },
                },
            },
            {
                $group: {
                    _id: {
                        month: "$createdAt",
                    },
                    total: {
                        $sum: "$SubTotal",
                    },
                },
            },
        ];
        const savedOrder = await Order.aggregate(pipeline);
        res.status(200).json({
            message: "Monthly Earning Fetched Successfully",
            statusCode: 200,
            data: savedOrder,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            Message: error.message,
            statusCode: 500,
            status: "ERROR",
        });
    }
};

exports.yearlyEarnings = async (req, res) => {
    try {
        const pipeline = [
            {
                $project: {
                    SubTotal: true,
                    createdAt: {
                        $year: "$createdAt",
                    },
                },
            },
            {
                $group: {
                    _id: {
                        year: "$createdAt",
                    },
                    total: {
                        $sum: "$SubTotal",
                    },
                },
            },
            {
                $sort: "-1",
            },
        ];
        const savedOrder = await Order.aggregate(pipeline);
        res.status(200).json({
            message: "Yearly Earning Fetched Successfully",
            statusCode: 200,
            data: savedOrder,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            Message: error.message,
            statusCode: 500,
            status: "ERROR",
        });
    }
};

exports.totalEarnings = async (req, res) => {
    try {
        const pipeline = [
            {
                $group: {
                    _id: null,
                    totalEarnings: {
                        $sum: "$SubTotal",
                    },
                },
            },
        ];
        const savedOrder = await Order.aggregate(pipeline);
        res.status(200).json({
            message: "Total Earning Fetched Successfully",
            statusCode: 200,
            data: savedOrder,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            Message: error.message,
            statusCode: 500,
            status: "ERROR",
        });
    }
};

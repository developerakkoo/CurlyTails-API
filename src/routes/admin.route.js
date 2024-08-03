const express = require("express");
const route = express.Router();
const adminController = require("../controller/admin.controller");
const Validate = require("../middleware/admin.middleware");
const { verifyToken } = require("../middleware/jwtVerify");

route.post("/singUp", Validate.validateAdmin, adminController.postSignup);

route.post("/login", adminController.AdminLogin);

route.put("/update/:adminId", adminController.updateAdmin);

route.get("/getAll/", adminController.getAllAdmin);

route.get("/get/:adminId", adminController.getAdminById);

// route.get('/admin/getAll/usersCount',adminController.getAllUserCount);

// route.get('/admin/getAll/productsCount',adminController.getAllProductCount)

// route.get('/admin/getAll/productCategoryCount',adminController.getAllProductCategoryCount);

// route.get('/admin/getAll/subCategoryCount',adminController.getAllSubCategoryCount);

// route.get('/admin/getAll/categoryCount',adminController.getAllCategoryCount);

route.get("/getAll/refundReq", adminController.getAllRefundRequest);

route.get("/getAll/orders", adminController.getAllOrders);

route.get("/getAll/Count", adminController.getAllCount);

route.delete("/delete/:adminId", adminController.deleteAdmin);

route.get("/get-monthly-earnings", adminController.monthlyEarnings);

route.get("/get-yearly-earnings", adminController.yearlyEarnings);

route.get("/get-total-earnings", adminController.totalEarnings);

/* delivery charges and gst data routes */

route.post("/data/add", adminController.createData);

route.get("/data/get", adminController.getData);

route.put("/data/update/:id", adminController.updateData);

module.exports = { AdminRoutes: route };

/**
 * @swagger
 * components:
 *   schemas:
 *     Admin:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - finished
 *       properties:
 *
 *         id:
 *           type: string
 *           description: The auto-generated id
 *         name:
 *           type: string
 *           description: Admin name filed is require
 *         email:
 *           type: string
 *           description: Admin email filed is require
 *
 *         phoneNo:
 *           type: number
 *           description: Admin phoneNo filed is require
 *
 *         password:
 *           type: string
 *           description: Admin Password Admin phoneNo filed is require
 *
 *         createdAt:
 *           type: string
 *           format: timestamps
 *           description: The date the data was added
 *
 *         updatedAt:
 *           type: string
 *           format: timestamps
 *           description: The date the data was updated
 *
 */

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin API's
 * /admin/singUp:
 *   post:
 *     description: Admin Signup
 *     tags: [Admin]
 *     requestBody:
 *        content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  name:
 *                     type: string
 *                     required: true
 *                  email:
 *                     type: string
 *                     required: true
 *                  phoneNo:
 *                     type: number
 *                     required: true
 *                  password:
 *                     type: string
 *                     required: true
 *
 *
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Admin'
 *
 *       406:
 *         description: Not Acceptable
 *         content:
 *          application/json:
 *            schema:
 *              type:
 *              object:
 *              properties:
 *                message:
 *                 type : string
 *
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            schema:
 *              type:
 *              object:
 *              properties:
 *                message:
 *                 type : string
 *
 *       500:
 *         description: Internal Server Error
 *         content:
 *          application/json:
 *            schema:
 *              type:
 *              object:
 *              properties:
 *                message:
 *                 type : string
 *                status:
 *                 type : string
 *
 * /App/verifyUser/sendOtp:
 *   post:
 *     description: Admin send Otp
 *     tags: [Admin]
 *
 *     requestBody:
 *        content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  phonenumber:
 *                     type: number
 *                     required: true
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *          application/json:
 *            schema:
 *              type:
 *              object:
 *              properties:
 *                message:
 *                 type : string
 *                statusCode:
 *                 type : string
 *                data:
 *                 type : string
 *
 *       404:
 *         description: Not Found
 *         content:
 *          application/json:
 *            schema:
 *              type:
 *              object:
 *              properties:
 *                message:
 *                 type : string
 *                statusCode:
 *                 type : string
 *
 *
 *       500:
 *         description: Internal Server Error
 *         content:
 *          application/json:
 *            schema:
 *              type:
 *              object:
 *              properties:
 *                message:
 *                 type : string
 *                status:
 *                 type : string
 *
 *
 * /App/admin/verify:
 *   post:
 *     description: Admin verify otp
 *     tags: [Admin]
 *
 *     requestBody:
 *        content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  phonenumber:
 *                     type: number
 *                     required: true
 *                  code:
 *                      type: number
 *                      required: true
 *
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *          application/json:
 *            schema:
 *              type:
 *              object:
 *              properties:
 *                message:
 *                 type : string
 *                statusCode:
 *                 type : string
 *                data:
 *                 type : string
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            schema:
 *              type:
 *              object:
 *              properties:
 *                message:
 *                 type : string
 *                statusCode:
 *                 type : string
 *
 *       404:
 *         description: Not Found
 *         content:
 *          application/json:
 *            schema:
 *              type:
 *              object:
 *              properties:
 *                message:
 *                 type : string
 *                statusCode:
 *                 type : string
 *
 *
 *       500:
 *         description: Internal Server Error
 *         content:
 *          application/json:
 *            schema:
 *              type:
 *              object:
 *              properties:
 *                message:
 *                 type : string
 *                status:
 *                 type : string
 *
 *
 * /admin/login:
 *   post:
 *     description: Admin login
 *     tags: [Admin]
 *
 *     requestBody:
 *        content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  email:
 *                     type: string
 *                     required: true
 *                  password:
 *                      type: string
 *                      required: true
 *
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *          application/json:
 *            schema:
 *              type:
 *              object:
 *              properties:
 *                message:
 *                 type : string
 *                statusCode:
 *                 type : string
 *                data:
 *                 type : string
 *       401:
 *         description: Unauthorized
 *         content:
 *          application/json:
 *            schema:
 *              type:
 *              object:
 *              properties:
 *                message:
 *                 type : string
 *                statusCode:
 *                 type : string
 *
 *       404:
 *         description: Not Found
 *         content:
 *          application/json:
 *            schema:
 *              type:
 *              object:
 *              properties:
 *                message:
 *                 type : string
 *                statusCode:
 *                 type : string
 *
 *
 *       500:
 *         description: Internal Server Error
 *         content:
 *          application/json:
 *            schema:
 *              type:
 *              object:
 *              properties:
 *                message:
 *                 type : string
 *                status:
 *                 type : string
 *
 * /admin/update/{adminId}:
 *   put:
 *     description: Update admin
 *     tags: [Admin]
 *     parameters:
 *          - in: header
 *            name: x-access-token
 *            description: Authorization header
 *            required: true
 *          - in: path
 *            name: adminId
 *            description: adminId
 *            required: true
 *            type: formData
 *     requestBody:
 *        content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  name:
 *                     type: string
 *                  email:
 *                     type: string
 *                  phoneNo:
 *                     type: number
 *                  password:
 *                     type: string
 *
 *
 *     responses:
 *       201:
 *         description: Updated
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Admin'
 *
 *       401:
 *         description: Unauthorized
 *         content:
 *          application/json:
 *            schema:
 *              type:
 *              object:
 *              properties:
 *                message:
 *                 type : string
 *       403:
 *         description: Forbidden
 *         content:
 *          application/json:
 *            schema:
 *              type:
 *              object:
 *              properties:
 *                message:
 *                 type : string
 *       404:
 *         description: Not Found
 *         content:
 *          application/json:
 *            schema:
 *              type:
 *              object:
 *              properties:
 *                message:
 *                 type : string
 *                statusCode:
 *                 type : string
 *
 *
 *       500:
 *         description: Internal Server Error
 *         content:
 *          application/json:
 *            schema:
 *              type:
 *              object:
 *              properties:
 *                message:
 *                 type : string
 *                status:
 *                 type : string
 *
 * /admin/get/{adminId}:
 *   get:
 *     description: Get admin by Id
 *     tags: [Admin]
 *     parameters:
 *          - in: header
 *            name: x-access-token
 *            description: Authorization header
 *            required: true
 *          - in: path
 *            name: adminId
 *            description: adminId
 *            required: true
 *            type: formData
 *
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Admin'
 *
 *       401:
 *         description: Unauthorized
 *         content:
 *          application/json:
 *            schema:
 *              type:
 *              object:
 *              properties:
 *                message:
 *                 type : string
 *       403:
 *         description: Forbidden
 *         content:
 *          application/json:
 *            schema:
 *              type:
 *              object:
 *              properties:
 *                message:
 *                 type : string
 *       404:
 *         description: Not Found
 *         content:
 *          application/json:
 *            schema:
 *              type:
 *              object:
 *              properties:
 *                message:
 *                 type : string
 *                statusCode:
 *                 type : string
 *
 *
 *       500:
 *         description: Internal Server Error
 *         content:
 *          application/json:
 *            schema:
 *              type:
 *              object:
 *              properties:
 *                message:
 *                 type : string
 *                status:
 *                 type : string
 *
 *
 * /admin/getAll:
 *   get:
 *     description: Get all admin
 *     tags: [Admin]
 *     parameters:
 *          - in: header
 *            name: x-access-token
 *            description: Authorization header
 *            required: true
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Admin'
 *
 *       401:
 *         description: Unauthorized
 *         content:
 *          application/json:
 *            schema:
 *              type:
 *              object:
 *              properties:
 *                message:
 *                 type : string
 *       403:
 *         description: Forbidden
 *         content:
 *          application/json:
 *            schema:
 *              type:
 *              object:
 *              properties:
 *                message:
 *                 type : string
 *       404:
 *         description: Not Found
 *         content:
 *          application/json:
 *            schema:
 *              type:
 *              object:
 *              properties:
 *                message:
 *                 type : string
 *                statusCode:
 *                 type : string
 *
 *
 *       500:
 *         description: Internal Server Error
 *         content:
 *          application/json:
 *            schema:
 *              type:
 *              object:
 *              properties:
 *                message:
 *                 type : string
 *                status:
 *                 type : string
 *
 * /admin/delete/{adminId}:
 *   delete:
 *     description: Delete admin
 *     tags: [Admin]
 *     parameters:
 *          - in: header
 *            name: x-access-token
 *            description: Authorization header
 *            required: true
 *          - in: path
 *            name: adminId
 *            description: adminId
 *            required: true
 *            type: formData
 *
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *          application/json:
 *            schema:
 *              type:
 *              object:
 *              properties:
 *                message:
 *                 type : string
 *                statusCode:
 *                 type : string
 *
 *       401:
 *         description: Unauthorized
 *         content:
 *          application/json:
 *            schema:
 *              type:
 *              object:
 *              properties:
 *                message:
 *                 type : string
 *       403:
 *         description: Forbidden
 *         content:
 *          application/json:
 *            schema:
 *              type:
 *              object:
 *              properties:
 *                message:
 *                 type : string
 *       404:
 *         description: Not Found
 *         content:
 *          application/json:
 *            schema:
 *              type:
 *              object:
 *              properties:
 *                message:
 *                 type : string
 *                statusCode:
 *                 type : string
 *
 *
 *       500:
 *         description: Internal Server Error
 *         content:
 *          application/json:
 *            schema:
 *              type:
 *              object:
 *              properties:
 *                message:
 *                 type : string
 *                status:
 *                 type : string
 *
 */

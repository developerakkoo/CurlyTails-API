const express = require("express");
const route = express.Router();
const subCategoryController = require("../controller/subCategory.controller");
const subCategoryMiddleware = require("../middleware/subCategory.middleware");

route.post(
  "/create",
  subCategoryMiddleware.validatePostSubCategory,
  subCategoryController.addSubCategory
);

route.put("/update/:subCategoryId", subCategoryController.updateSubCategory);

route.get("/getAll", subCategoryController.getAllSubCategory);

route.get("/get/top", subCategoryController.getTopSubCategory);

route.get("/get/trending", subCategoryController.getTrendingCategory);

route.get(
  "/get/category/:CategoryId",
  subCategoryController.getSubCategoryByCategoryId
);

route.get("/get/:subCategoryId", subCategoryController.getSubCategoryById);

route.delete("/delete/:subCategoryId", subCategoryController.deleteSubCategory);

module.exports = { subCategoryRoutes: route };

/**
 * @swagger
 * components:
 *   schemas:
 *     subCategory:
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
 *         CategoryId:
 *           type: Schema.Types.ObjectId
 *           description:  CategoryId filed is require
 *         name:
 *           type: string
 *           description: name filed is require
 *         description:
 *           type: string
 *           description: description filed is require
 *         isTopSUBCategory:
 *           type: boolean
 *           description: Default false
 *         isTrendingSUBCategory:
 *           type: boolean
 *           description: Default false
 *         createdAt:
 *           type: string
 *           format: timestamps
 *           description: The date data was added
 *
 *         updatedAt:
 *           type: string
 *           format: timestamps
 *           description: The date data was updated
 *
 */

/**
 * @swagger
 * tags:
 *   name: subCategory
 *   description: subCategory API's
 * /create/subCategory:
 *   post:
 *     description: Add subCategory
 *     tags: [subCategory]
 *     requestBody:
 *        content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  CategoryId:
 *                     type: string
 *                     required: true
 *                  name:
 *                     type: string
 *                     required: true
 *                  description:
 *                     type: string
 *                     required: true
 *
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Category'
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
 * /update/subCategory/{subCategoryId}:
 *   put:
 *     description: Update subCategory
 *     tags: [subCategory]
 *     parameters:
 *          - in: path
 *            name: subCategoryId
 *            description: subCategoryId
 *            required: true
 *            type: formData
 *     requestBody:
 *        content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  CategoryId:
 *                     type: string
 *                  name:
 *                     type: string
 *                  description:
 *                     type: string
 *                  isTopSUBCategory:
 *                     type: boolean
 *                  isTrendingSUBCategory :
 *                     type: boolean
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
 * /get/subCategory/{subCategoryId}:
 *   get:
 *     description: Get subCategory by Id
 *     tags: [subCategory]
 *     parameters:
 *          - in: path
 *            name: subCategoryId
 *            description: subCategoryId
 *            required: true
 *            type: formData
 *
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *          application/json:
 *            schema:
 *                message:
 *                 type : string
 *                data:
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
 * /get/subCategory/category/{categoryId}:
 *   get:
 *     description: Get subCategory by categoryId
 *     tags: [subCategory]
 *     parameters:
 *          - in: path
 *            name: categoryId
 *            description: categoryId
 *            required: true
 *            type: formData
 *
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *          application/json:
 *            schema:
 *                message:
 *                 type : string
 *                data:
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
 * /getAll/subCategory:
 *   get:
 *     description: Get all subCategory
 *     tags: [subCategory]
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
 *                data:
 *                 type : string
 *                length:
 *                 type : string
 *
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
 * /get/top/subCategory:
 *   get:
 *     description: Get top-subCategory
 *     tags: [subCategory]
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
 * /get/trending/subCategory:
 *   get:
 *     description: Get trending-subCategory
 *     tags: [subCategory]
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
 * /delete/subCategory/{subCategoryId}:
 *   delete:
 *     description: Delete subCategoryId
 *     tags: [subCategory]
 *     parameters:
 *          - in: path
 *            name: subCategoryId
 *            description: subCategoryId
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
 */

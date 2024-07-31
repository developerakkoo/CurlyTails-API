const express = require("express");
const route = express.Router();
const productCategoryController = require("../controller/productCategory.controller");
const productCategoryMiddleware = require("../middleware/productCategory.middleware");

route.post(
  "/create",
  productCategoryMiddleware.validatePostProductCategory,
  productCategoryController.addProductCategory
);

route.put(
  "/update/:productCategoryId",
  productCategoryController.updateProductCategory
);

route.get("/getAll", productCategoryController.getAllProductCategory);

route.get("/get-top", productCategoryController.TopProductCategory);

route.get("/get-Trending", productCategoryController.TrendingProductCategory);

route.get(
  "/get/:productCategoryId",
  productCategoryController.getProductCategoryById
);

route.get(
  "/get/category/:CategoryId",
  productCategoryController.getProductCategoryByCategoryId
);

route.get(
  "/get/subCategory/:subCategoryId",
  productCategoryController.getProductCategoryBySubCategoryId
);

route.delete(
  "/delete/:productCategoryId",
  productCategoryController.deleteProductCategory
);

module.exports = { productCategoryRoutes: route };

/**
 * @swagger
 * components:
 *   schemas:
 *     productCategory:
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
 *         subCategoryId:
 *           type: Schema.Types.ObjectId
 *           description:  subCategoryId filed is require
 *         name:
 *           type: string
 *           description: name filed is require
 *         description:
 *           type: string
 *           description: description filed is require
 *         isTopProductCategory:
 *           type: boolean
 *           description: Default false
 *         isTrendingProductCategory:
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
 *   name: productCategory
 *   description: Product category API's
 * /create/productCategory:
 *   post:
 *     description: Add productCategory
 *     tags: [productCategory]
 *     requestBody:
 *        content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  CategoryId:
 *                     type: string
 *                     required: true
 *                  subCategoryId:
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
 *              type:
 *              object:
 *              properties:
 *                message:
 *                 type : string
 *                data:
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
 *       404:
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
 * /update/productCategory/{productCategoryId}:
 *   put:
 *     description: Update product category
 *     tags: [productCategory]
 *     parameters:
 *          - in: path
 *            name: productCategoryId
 *            description: productCategoryId
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
 *                  subCategoryId:
 *                     type: string
 *                  name:
 *                     type: string
 *                  description:
 *                     type: string
 *                  isTopProductCategory:
 *                     type: boolean
 *                  isTrendingProductCategory  :
 *                     type: boolean
 *     responses:
 *       201:
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
 * /get/productCategory/subCategory/{subCategoryId}:
 *   get:
 *     description: Get productCategory by subCategoryId
 *     tags: [productCategory]
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
 * /get/productCategory/category/{categoryId}:
 *   get:
 *     description: Get productCategory by categoryId
 *     tags: [productCategory]
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
 * /get/productCategory/{productCategoryId}:
 *   get:
 *     description: Get productCategory by Id
 *     tags: [productCategory]
 *     parameters:
 *          - in: path
 *            name: productCategoryId
 *            description: productCategoryId
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
 * /getAll/productCategory:
 *   get:
 *     description: Get all productCategory
 *     tags: [productCategory]
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
 * /get-top/productCategory:
 *   get:
 *     description: Get top-productCategory
 *     tags: [productCategory]
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
 * /get-trending/productCategory:
 *   get:
 *     description: Get trending-productCategory
 *     tags: [productCategory]
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
 * /delete/productCategory/{productCategoryId}:
 *   delete:
 *     description: Delete productCategoryId
 *     tags: [productCategory]
 *     parameters:
 *          - in: path
 *            name: productCategoryId
 *            description: productCategoryId
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

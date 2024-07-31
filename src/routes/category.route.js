const express = require("express");
const route = express.Router();
const CategoryController = require("../controller/category.controller");
const CategoryMiddleware = require("../middleware/category.middleware");

route.post(
  "/create",
  CategoryMiddleware.validatePostCategory,
  CategoryController.addCategory
);

route.put("/update/:categoryId", CategoryController.updateCategory);

route.get("/getAll", CategoryController.getAllCategory);

route.get("/get/:categoryId", CategoryController.getCategoryById);

route.get("/get/Top", CategoryController.getTopCategory);

route.delete("/delete/:categoryId", CategoryController.deleteCategory);

module.exports = { CategoryRoutes: route };

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
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
 *           description:  name filed is require
 *         description:
 *           type: string
 *           description: description filed is require
 *
 *         isTopCategory:
 *           type: boolean
 *           description: Default false
 *
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
 *   name: Category
 *   description: Category API's
 * /create/category:
 *   post:
 *     description: Add category
 *     tags: [Category]
 *     parameters:
 *          - in: header
 *            name: x-access-token
 *            description: Authorization header
 *            required: true
 *     requestBody:
 *        content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
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
 * /update/category/{categoryId}:
 *   put:
 *     description: Update category
 *     tags: [Category]
 *     parameters:
 *          - in: header
 *            name: x-access-token
 *            description: Authorization header
 *            required: true
 *          - in: path
 *            name: categoryId
 *            description: categoryId
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
 *                  description:
 *                     type: string
 *                  isTopCategory:
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
 * /get/category/{categoryId}:
 *   get:
 *     description: Get category by Id
 *     tags: [Category]
 *     parameters:
 *          - in: header
 *            name: x-access-token
 *            description: Authorization header
 *            required: true
 *          - in: path
 *            name: categoryId
 *            description: categoryId
 *            required: true
 *            type: formData
 *
 *     responses:
 *       200:
 *         description: Updated
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
 * /getAll/category:
 *   get:
 *     description: Get all category
 *     tags: [Category]
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
 * /get/Top-category:
 *   get:
 *     description: Get top-category
 *     tags: [Category]
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
 * /delete/category/{categoryId}:
 *   delete:
 *     description: Delete categoryId
 *     tags: [Category]
 *     parameters:
 *          - in: header
 *            name: x-access-token
 *            description: Authorization header
 *            required: true
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

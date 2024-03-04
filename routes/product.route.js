const express = require("express");
const route = express.Router();
const productController = require("../controller/products.controller");
const Validation = require("../middleware/product.middleware");
const Upload = require("../middleware/Upload");

route.post(
  "/addProduct",
  Upload.array("images"),
  Validation.validateProduct,
  productController.addProduct
);

route.put("/update/product/:productId", productController.updateProduct);

route.put(
  "/update/images/:productId",
  Upload.array("images"),
  productController.updatedImage
);

route.get("/getAll/product", productController.getAllProduct);

route.get("/get-top/product", productController.getTopProduct);

route.get("/get-trending/product", productController.getTrendingProduct);

route.get("/get/product/:productId", productController.getProductById);

route.delete("/delete/product/:productId", productController.deleteProduct);

route.get(
  "/get/product/CategoryId/:CategoryId",
  productController.getProductByCategoryId
);

route.get(
  "/get/product/subCategoryId/:subCategoryId",
  productController.getProductBySubCategoryId
);

route.get(
  "/get/product/productCategoryId/:productCategoryId",
  productController.getProductByProductCategoryId
);

route.get("/search/product", productController.ProductSearchOption);

route.delete(
  "/delete/image/:productId/:imageId",
  productController.deleteImage
);

module.exports = { ProductRoutes: route };

/**
 * TODO: Septate image upload and update  the api's
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
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
 *         productCategoryId:
 *           type: Schema.Types.ObjectId
 *           description:  productCategoryId filed is require
 *         name:
 *           type: string
 *           description: name filed is require
 *         brand:
 *           type: string
 *           description: brand filed is require
 *         description:
 *           type: string
 *           description: description filed is require
 *         LifeStage:
 *           type: string
 *           description: LifeStage filed is require
 *         BreedSize:
 *           type: string
 *           description: BreedSize filed is require
 *         flavor:
 *           type: string
 *           description: flavor filed is require
 *         vegNonVeg:
 *           type: string
 *           description: vegNonVeg filed is require
 *         size:
 *           type: string
 *           description: size filed is require
 *         images:
 *           type: array
 *           description: product images default []
 *         isTopProduct:
 *           type: boolean
 *           description: Default false
 *         isTrendingProduct:
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
 *   name: Product
 *   description: Product API's
 * /addProduct:
 *   post:
 *     description: Add productCategory
 *     tags: [Product]
 *     parameters:
 *          - in: header
 *            name: x-access-token
 *            description: Authorization header
 *            required: true
 *     requestBody:
 *        content:
 *           multipart/form-data:
 *             schema:
 *                type: object
 *                properties:
 *                  CategoryId:
 *                     type: string
 *                     required: true
 *                  subCategoryId:
 *                     type: string
 *                     required: true
 *                  productCategoryId:
 *                     type: string
 *                     required: true
 *                  name:
 *                     type: string
 *                     required: true
 *                  brand:
 *                     type: string
 *                     required: true
 *                  description:
 *                     type: string
 *                     required: true
 *                  LifeStage:
 *                     type: string
 *                     required: true
 *                  BreedSize:
 *                     type: string
 *                     required: true
 *                  flavor:
 *                     type: string
 *                     required: true
 *                  vegNonVeg:
 *                     type: string
 *                     required: true
 *                  size:
 *                     type: string
 *                     required: true
 *                  price:
 *                     type: number
 *                     required: true
 *                  images:
 *                      type: array
 *                      items:
 *                         type: string
 *                         format: binary
 *                         required: true
 *
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
 * /update/product/{productId}:
 *   put:
 *     description: Update product
 *     tags: [Product]
 *     parameters:
 *          - in: header
 *            name: x-access-token
 *            description: Authorization header
 *            required: true
 *          - in: path
 *            name: productId
 *            description: productId
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
 *                     required: true
 *                  subCategoryId:
 *                     type: string
 *                     required: true
 *                  productCategoryId:
 *                     type: string
 *                     required: true
 *                  name:
 *                     type: string
 *                     required: true
 *                  brand:
 *                     type: string
 *                     required: true
 *                  description:
 *                     type: string
 *                     required: true
 *                  LifeStage:
 *                     type: string
 *                     required: true
 *                  BreedSize:
 *                     type: string
 *                     required: true
 *                  flavor:
 *                     type: string
 *                     required: true
 *                  vegNonVeg:
 *                     type: string
 *                     required: true
 *                  size:
 *                     type: string
 *                     required: true
 *                  price:
 *                     type: number
 *                     required: true
 *                  isTopProduct:
 *                     type: boolean
 *                  isTrendingProduct  :
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
 * /get/product/{productId}:
 *   get:
 *     description: Get product by Id
 *     tags: [Product]
 *     parameters:
 *          - in: header
 *            name: x-access-token
 *            description: Authorization header
 *            required: true
 *          - in: path
 *            name: productId
 *            description: productId
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
 * /get/product/subCategoryId/{subCategoryId}:
 *   get:
 *     description: Get product by subCategoryId
 *     tags: [Product]
 *     parameters:
 *          - in: header
 *            name: x-access-token
 *            description: Authorization header
 *            required: true
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
 * /get/product/categoryId/{categoryId}:
 *   get:
 *     description: Get product by categoryId
 *     tags: [Product]
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
 * /get/product/productCategoryId/{productCategoryId}:
 *   get:
 *     description: Get product by productCategoryId
 *     tags: [Product]
 *     parameters:
 *          - in: header
 *            name: x-access-token
 *            description: Authorization header
 *            required: true
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
 * /getAll/product:
 *   get:
 *     description: Get all product
 *     tags: [Product]
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
 * /get-top/product:
 *   get:
 *     description: Get top-product
 *     tags: [Product]
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
 * /get-trending/product:
 *   get:
 *     description: Get trending-product
 *     tags: [Product]
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
 * /search/product:
 *   get:
 *     description: Search product
 *     tags: [Product]
 *     parameters:
 *          - in: header
 *            name: x-access-token
 *            description: Authorization header
 *            required: true
 *          - name: q
 *            in: query
 *            description: Search term
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
 * /delete/product/{productId}:
 *   delete:
 *     description: Delete product
 *     tags: [Product]
 *     parameters:
 *          - in: header
 *            name: x-access-token
 *            description: Authorization header
 *            required: true
 *          - in: path
 *            name: productId
 *            description: productId
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

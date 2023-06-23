const express = require('express');
const route = express.Router();
const productController = require('../controller/products.controller');
const Validation = require('../middleware/product.middleware');
const Upload = require('../middleware/Upload');

route.post('/addProduct',Upload.array('images'),Validation.validateProduct,productController.addProduct);

route.put('/update/product/:productId',productController.updateProduct);

route.get('/getAll/product',productController.getAllProduct);

route.get('/get-top/product',productController.getTopProduct);

route.get('/get-trending/product',productController.getTrendingProduct);

route.get('/get/product/:productId',productController.getProductById);

route.delete('/delete/product/:productId',productController.deleteProduct)

route.get('/get/product/CategoryId/:CategoryId',productController.getProductByCategoryId);

route.get('/get/product/subCategoryId/:subCategoryId',productController.getProductBySubCategoryId);

route.get('/get/product/productCategoryId/:productCategoryId',productController.getProductByProductCategoryId);

route.get('/search/product',productController.ProductSearchOption)

module.exports ={ProductRoutes:route}
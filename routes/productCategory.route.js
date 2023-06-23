const express = require('express');
const route = express.Router();
const productCategoryController = require('../controller/productCategory.controller');
const productCategoryMiddleware =  require('../middleware/productCategory.middleware');

route.post('/create/productCategory',productCategoryMiddleware.validatePostProductCategory,productCategoryController.addProductCategory);

route.put('/update/productCategory/:productCategoryId',productCategoryController.updateProductCategory);

route.get('/getAll/productCategory',productCategoryController.getAllProductCategory);

route.get('/get-top/productCategory',productCategoryController.TopProductCategory);

route.get('/get-Trending/productCategory',productCategoryController.TrendingProductCategory);

route.get('/get/productCategory/:productCategoryId',productCategoryController.getProductCategoryById);

route.get('/get/productCategory/category/:CategoryId',productCategoryController.getProductCategoryByCategoryId);

route.get('/get/productCategory/subCategory/:subCategoryId',productCategoryController.getProductCategoryBySubCategoryId);

route.delete('/delete/productCategory/:productCategoryId',productCategoryController.deleteProductCategory);

module.exports = {productCategoryRoutes : route}



const express = require('express');
const route = express.Router();
const subCategoryController = require('../controller/subCategory.controller');
const subCategoryMiddleware =  require('../middleware/subCategory.middleware');

route.post('/create/subCategory',subCategoryMiddleware.validatePostSubCategory,subCategoryController.addSubCategory);

route.put('/update/subCategory/:subCategoryId',subCategoryController.updateSubCategory);

route.get('/getAll/subCategory',subCategoryController.getAllSubCategory);

route.get('/get-top/subCategory',subCategoryController.getTopSubCategory);

route.get('/get-trending/subCategory',subCategoryController.getTrendingCategory);

route.get('/get/subCategory/category/:CategoryId',subCategoryController.getSubCategoryByCategoryId);

route.get('/get/subCategory/:subCategoryId',subCategoryController.getSubCategoryByCategoryId);

route.delete('/delete/subCategory/:subCategoryId',subCategoryController.deleteSubCategory);

module.exports = {subCategoryRoutes : route}



const express = require('express');
const route = express.Router();
const CategoryController = require('../controller/category.controller');
const CategoryMiddleware =  require('../middleware/category.middleware');

route.post('/create/category',CategoryMiddleware.validatePostCategory,CategoryController.addCategory);

route.put('/update/category/:categoryId',CategoryController.updateCategory);

route.get('/get/category',CategoryController.getAllCategory);

route.get('/get/category/:categoryId',CategoryController.getCategoryById);

route.delete('/delete/category/:categoryId',CategoryController.deleteCategory);

module.exports = {CategoryRoutes : route}



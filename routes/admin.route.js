const express = require('express');
const route = express.Router();
const adminController = require('../controller/admin.controller');
const Validate = require('../middleware/admin.middleware');

route.post('/admin/singUp',Validate.validateAdmin,adminController.postSignup);

route.post('/admin/login',adminController.AdminLogin);

route.put('/admin/update/:adminId',adminController.updateAdmin);

route.get('/admin/getAll/',adminController.getAllAdmin);

route.get('/admin/get/:adminId',adminController.getAdminById);

route.delete('/admin/delete/:adminId',adminController.deleteAdmin);

module.exports = {AdminRoutes : route}
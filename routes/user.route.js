const express = require('express');
const route = express.Router();
const UserController = require('../controller/user.controller');
const Validate = require('../middleware/user.middleware');

route.post('/user/signUp',Validate.validateUser,UserController.postSignup);

route.post('/user/login',UserController.loginUser);

route.put('/user/update/:userId',UserController.UpdateUsers);

route.get('/user/get',UserController.getAllUsers);

route.get('/user/get/:userId',UserController.getUsersById);

route.delete('/user/delete/:userId',UserController.deleteUsers);


module.exports = {UserRoutes : route}
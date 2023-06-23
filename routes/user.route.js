const express = require('express');
const route = express.Router();
const UserController = require('../controller/user.controller');
const Validate = require('../middleware/user.middleware');

route.post('/user/signUp',Validate.validateUser,UserController.postSignup);

route.post('/user/login',UserController.loginUser);

route.put('/update/user/:userId',UserController.UpdateUsers);

route.get('/getAll/user',UserController.getAllUsers);

route.get('/get/user/:userId',UserController.getUsersById);

route.delete('/delete/user/:userId',UserController.deleteUsers);


module.exports = {UserRoutes : route}
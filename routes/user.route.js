const express = require('express');
const route = express.Router();
const UserController = require('../controller/user.controller');
const Validate = require('../middleware/user.middleware');
const {verifyToken} = require('../middleware/jwtVerify');

route.post('/user/singUp',Validate.validateUser,UserController.postSignup);

route.post('/user/login',UserController.loginUser);

route.put('/update/user/:userId',verifyToken,UserController.UpdateUsers);

route.get('/getAll/user',verifyToken,UserController.getAllUsers);

route.get('/get/user/:userId',verifyToken,UserController.getUsersById);

route.delete('/delete/user/:userId',verifyToken,UserController.deleteUsers);


module.exports = {UserRoutes : route}



/**
 * @swagger
 * components:
 *   schemas:
 *     User:
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
 *           description: User name filed is require
 *         email:
 *           type: string
 *           description: User email filed is require
 * 
 *         phoneNo:
 *           type: number
 *           description: User phoneNo filed is require
 * 
 *         password: 
 *           type: string
 *           description: User Password  filed is require
 *  
 *         address: 
 *           type: string
 *           description: User address  filed is require
 *  
 *         isActive: 
 *           type: boolean
 *           description: Default false
 * 
 *         isBlock: 
 *           type: boolean
 *           description: Default false
 * 
 *         createdAt:
 *           type: string
 *           format: timestamps
 *           description: The date the data was added
 * 
 *         updatedAt:
 *           type: string
 *           format: timestamps
 *           description: The date the data was updated
 *     
 */


/**
 * @swagger
 * tags:
 *   name: User 
 *   description: User API's
 * /user/singUp:
 *   post:
 *     description: User Signup
 *     tags: [User]
 *     requestBody:
 *        content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties: 
 *                  name:
 *                     type: string
 *                     required: true
 *                  email:
 *                     type: string
 *                     required: true
  *                  phoneNo:
 *                     type: number
 *                     required: true
  *                  password:
 *                     type: string
 *                     required: true
  *                  address:
 *                     type: string
 *                     required: true
 * 
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
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
 * /App/verifyUser/sendOtp:
 *   post:
 *     description: User send Otp
 *     tags: [User]
 *  
 *     requestBody:
 *        content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties: 
 *                  phonenumber:
 *                     type: number
 *                     required: true
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
 * /App/User/verify:
 *   post:
 *     description: User verify otp
 *     tags: [User]
 *  
 *     requestBody:
 *        content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties: 
 *                  phonenumber:
 *                     type: number
 *                     required: true
 *                  code:
 *                      type: number 
 *                      required: true
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
 *                statusCode:
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
 * /user/login:
 *   post:
 *     description: User login
 *     tags: [User]
 *  
 *     requestBody:
 *        content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties: 
 *                  email:
 *                     type: string
 *                     required: true
 *                  password:
 *                      type: string 
 *                      required: true
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
 *                statusCode:
 *                 type : string
 *                data:
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
 *                statusCode:
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
 * /update/user/{userId}:
 *   put:
 *     description: Update User
 *     tags: [User]
 *     parameters:
 *          - in: header
 *            name: x-access-token
 *            description: Authorization header
 *            required: true
 *          - in: path
 *            name: userId
 *            description: userId
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
 *                  email:
 *                     type: string
  *                  phoneNo:
 *                     type: number
  *                  password:
 *                     type: string
  *                  address:
 *                     type: string
  *                  isActive:
 *                     type: string
  *                  isBlock:
 *                     type: string
 *  
 *     responses:
 *       201:
 *         description: Updated
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
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
 * /get/user/{userId}:
 *   get:
 *     description: Get user by Id
 *     tags: [User]
 *     parameters:
 *          - in: header
 *            name: x-access-token
 *            description: Authorization header
 *            required: true
 *          - in: path
 *            name: userId
 *            description: UserId
 *            required: true
 *            type: formData
 *  
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
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
 * /getAll/user:
 *   get:
 *     description: Get all user 
 *     tags: [User]
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
 *              $ref: '#/components/schemas/User'
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
  * /delete/user/{userId}:
 *   delete:
 *     description: Delete User 
 *     tags: [User]
 *     parameters:
 *          - in: header
 *            name: x-access-token
 *            description: Authorization header
 *            required: true
 *          - in: path
 *            name: userId
 *            description: UserId
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


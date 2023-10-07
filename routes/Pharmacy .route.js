const express = require('express');
const route = express.Router();
const PharmacyController = require('../controller/Pharmacy.Controller');
const validatedData = require('../middleware/Pharmacy.middleware');
const Upload = require('../middleware/Upload');


route.post('/add/pharmacy',validatedData.validatePharmacy,PharmacyController.postPharmacy);

route.put('/add/image/pharmacy/:pharmacyId',Upload.single('file'),PharmacyController.updateImage);

route.put('/update/pharmacy/details/:pharmacyId',PharmacyController.updatedPharmacy);

route.get('/getAll/pharmacy',PharmacyController.getAllPharmacy);

route.get('/get/pharmacy/:pharmacyId',PharmacyController.getPharmacyById);

route.delete('/delete/pharmacy/:pharmacyId',PharmacyController.deletePharmacy);

module.exports = { PharmacyRoutes : route }




/**
 * @swagger
 * components:
 *   schemas:
 *     Pharmacy:
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
 *         BrandName:
 *           type: string
 *           description: BrandName Is Require
 *         medicineName:
 *           type: string
 *           description: medicineName Is Require
 *         description:
 *           type: string
 *           description: description Is Require
 *         imageUrl:
 *           type: string
 *           description: Image Require
 *         Stock: 
 *           type: number
 *           description: Default 0
 *         inStock: 
 *           type: boolean
 *           description: Default false
 *         price: 
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
 *   name: Pharmacy 
 *   description: Pharmacy API's
 * /add/pharmacy:
 *   post:
 *     description: Add pharmacy
 *     tags: [Pharmacy]
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
 *                  BrandName:
 *                      type: string 
 *                      required: true
 *                  medicineName:
 *                      type: string 
 *                      required: true
 *                  description:
 *                      type: string 
 *                      required: true
 *                  price:
 *                      type: number 
 *                      required: true
 *                  Stock:
 *                      type: number 
 *                      required: true
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
 *                statusCode:
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
 * /add/image/pharmacy/{pharmacyId}:
 *   put:
 *     description: Update pharmacy image
 *     tags: [Pharmacy]
 *     parameters:
 *          - in: header
 *            name: x-access-token
 *            description: Authorization header
 *            required: true
 *          - in: path
 *            name: pharmacyId
 *            description: pharmacyId
 *            required: true
 *            type: formData
 *     requestBody:
 *        content:
 *           multipart/form-data:
 *             schema:
 *                type: object
 *                properties: 
 *                  file:
 *                      type: string 
 *                      format: binary
 *                      required: true
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
 *                statusCode:
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
 * 
 * /update/pharmacy/details/{pharmacyId}:
 *   put:
 *     description: Update pharmacy 
 *     tags: [Pharmacy]
 *     parameters:
 *          - in: header
 *            name: x-access-token
 *            description: Authorization header
 *            required: true
 *          - in: path
 *            name: pharmacyId
 *            description: pharmacyId
 *            required: true
 *            type: formData
 *     requestBody:
 *        content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties: 
 *                  BrandName:
 *                     type: string
 *                     required: true    
 *                  medicineName:
 *                     type: string
 *                     required: true 
 *                  description:
 *                     type: string
 *                     required: true 
 *                  price:
 *                     type: number
 *                     required: true 
 *                  Stock:
 *                     type: number
 *                     required: true 
 *                  inStock:
 *                     type: boolean
 *                     required: true 
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
 * /getAll/pharmacy:
 *   get:
 *     description: Get all pharmacy 
 *     tags: [Pharmacy]
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
 *                length:
 *                 type : string
 *                data:
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
 * /get/pharmacy/{pharmacyId}:
 *   get:
 *     description: Get pharmacy by Id
 *     tags: [Pharmacy]
 *     parameters:
 *          - in: header
 *            name: x-access-token
 *            description: Authorization header
 *            required: true
 *          - in: path
 *            name: pharmacyId
 *            description: pharmacyId
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
 *                data:
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
  * /delete/pharmacy/{pharmacyId}:
 *   delete:
 *     description: Delete pharmacy 
 *     tags: [Pharmacy]
 *     parameters:
 *          - in: header
 *            name: x-access-token
 *            description: Authorization header
 *            required: true
 *          - in: path
 *            name: pharmacyId
 *            description: pharmacyId
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
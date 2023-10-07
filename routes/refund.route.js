const express = require('express');
const route = express.Router();
const refundController = require('../controller/refund.controller');
const {validateRefund} = require('../middleware/refund.middleware');


route.post('/post/refund',validateRefund,refundController.postRefund);

route.get('/get/refund/:refundId',refundController.getRefundRequestById);

route.get('/getAll/refund',refundController.getAllRefundRequest);

route.put('/update/refund-status/:refundId',refundController.updateRefundRequestStatus);

route.delete('/delete/refund/:refundId',refundController.deleteRefundRequest);


module.exports={RefundRoutes : route}


/**
 * @swagger
 * components:
 *   schemas:
 *     Refund:
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
 *         userId:
 *           type: Schema.Types.ObjectId
 *           description: userId filed is require
 *         orderId:
 *           type: Schema.Types.ObjectId
 *           description: orderId filed is require
 * 
 *         description: 
 *           type: string
 *           description: description  filed is require
 *  
 *         refundStatus: 
 *           type: string
 *           description: refundStatus  
 *  
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
 *   name: Refund 
 *   description: Refund API's
 * /post/refund:
 *   post:
 *     description: Post refund
 *     tags: [Refund]
 *     requestBody:
 *        content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties: 
 *                  userId:
 *                     type: string
 *                     required: true
 *                  OrderId:
 *                     type: string
 *                     required: true
  *                  description:
 *                     type: number
 *                     required: true
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
 * /update/refund-status/{refundId}:
 *   put:
 *     description: Update refund-status
 *     tags: [Refund]
 *     parameters:
 *          - in: path
 *            name: refundId
 *            description: refundId
 *            required: true
 *            type: formData
 *     requestBody:
 *        content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties: 
 *                  status:
 *                     type: string
 *  
 *     responses:
 *       200:
 *         description: Updated
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
 *                statusCode:
 *                 type : string
 *  
 * /get/refund/{refundId}:
 *   get:
 *     description: Get refund by Id
 *     tags: [Refund]
 *     parameters:
 *          - in: path
 *            name: refundId
 *            description: refundId
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
 * /getAll/refund:
 *   get:
 *     description: Get all refund 
 *     tags: [Refund]
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
  * /delete/refund/{refundId}:
 *   delete:
 *     description: Delete Refund 
 *     tags: [Refund]
 *     parameters:
 *          - in: path
 *            name: refundId
 *            description: refundId
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

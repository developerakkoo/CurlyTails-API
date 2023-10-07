const express = require('express');
const route = express.Router();
const BannerController = require('../controller/Banner.Controller');
const upload = require('../middleware/Upload');

route.post('/add/banner',upload.single('file'),BannerController.addBanner);


route.get('/getAll/banner',BannerController.getBanners);

route.get('/get/banner/:bannerId',BannerController.getBannerById);

route.put('/update/banner/:bannerId',upload.single('file'),BannerController.updateBanner);

route.put('/update-Top-Trending/banner/:bannerId',BannerController.isTopBanner);

route.delete('/delete/banner/:bannerId',BannerController.deleteBanner);

route.get('/get-Trending/banner',BannerController.getTrendingBanner);

route.get('/get-top/banner',BannerController.getTopBanner);

module.exports={BannerRoutes : route }


/**
 * @swagger
 * components:
 *   schemas:
 *     Banner:
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
 *         imageUrl:
 *           type: string
 *           description: Banner Image Require
 *         isTopBanner:
 *           type: boolean
 *           description: Default false
 * 
 *         isTrendingBanner: 
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
 *   name: Banner 
 *   description: Banner API's
 * /add/banner:
 *   post:
 *     description: Post Banner
 *     tags: [Banner]
 *     parameters:
 *          - in: header
 *            name: x-access-token
 *            description: Authorization header
 *            required: true
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
 * /update/banner/{bannerId}:
 *   put:
 *     description: update Banner
 *     tags: [Banner]
 *     parameters:
 *          - in: header
 *            name: x-access-token
 *            description: Authorization header
 *            required: true
 *          - in: path
 *            name: bannerId
 *            description: bannerId
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
 * /update-Top-Trending/banner/{bannerId}:
 *   put:
 *     description: Update banner by status 
 *     tags: [Banner]
 *     parameters:
 *          - in: header
 *            name: x-access-token
 *            description: Authorization header
 *            required: true
 *          - in: path
 *            name: bannerId
 *            description: bannerId
 *            required: true
 *            type: formData
 *     requestBody:
 *        content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties: 
 *                  isTopBanner:
 *                     type: string
 *                  isTrendingBanner:
 *                     type: string
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
 * /getAll/banner:
 *   get:
 *     description: Get all banner 
 *     tags: [Banner]
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
 * /get-Trending/banner:
 *   get:
 *     description: Get all Trending banner 
 *     tags: [Banner]
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
 * /get-top/banner:
 *   get:
 *     description: Get all top banner 
 *     tags: [Banner]
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
 * /get/banner/{bannerId}:
 *   get:
 *     description: Get banner by Id 
 *     tags: [Banner]
 *     parameters:
 *          - in: header
 *            name: x-access-token
 *            description: Authorization header
 *            required: true
 *          - in: path
 *            name: bannerId
 *            description: bannerId
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
  * /delete/banner/{bannerId}:
 *   delete:
 *     description: Delete banner 
 *     tags: [Banner]
 *     parameters:
 *          - in: header
 *            name: x-access-token
 *            description: Authorization header
 *            required: true
 *          - in: path
 *            name: bannerId
 *            description: bannerId
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

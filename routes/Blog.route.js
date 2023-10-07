const express = require('express');
const route = express.Router();
const BlogController = require('../controller/Blog.Controller');
const upload = require('../middleware/Upload');
const validateData = require('../middleware/Blog.middleware');


route.post('/post/blog',upload.single('file'),validateData.validateBlog,BlogController.postBlog);

route.put('/update/blogImage/:blogId',upload.single('file'),BlogController.updateBlogImage);

route.put('/update/blog/:blogId',BlogController.updateBlog);

route.get('/getAll/Blog',BlogController.getAllBlogs);

route.get('/get-top/Blog',BlogController.getTopBlogs);

route.get('/get/Blog/:blogId',BlogController.getBlogById);

route.delete('/delete/Blog/:blogId',BlogController.deleteBlog);


module.exports={BlogRoutes : route}



/**
 * @swagger
 * components:
 *   schemas:
 *     Blog:
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
 *         Title:
 *           type: string
 *           description: Title Is Require
 *         description:
 *           type: string
 *           description: description Is Require
 *         imageUrl:
 *           type: string
 *           description: Banner Image Require
 *         isTopBlog: 
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
 *   name: Blog 
 *   description: Blog API's
 * /post/blog:
 *   post:
 *     description: Post Blog
 *     tags: [Blog]
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
 *                  title:
 *                      type: string 
 *                      required: true
 *                  description:
 *                      type: string 
 *                      required: true
 *                  file:
 *                      type: string 
 *                      format: binary
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
 * /update/blogImage/{blogId}:
 *   put:
 *     description: update blog
 *     tags: [Blog]
 *     parameters:
 *          - in: header
 *            name: x-access-token
 *            description: Authorization header
 *            required: true
 *          - in: path
 *            name: blogId
 *            description: blogId
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
 * /update/blog/{blogId}:
 *   put:
 *     description: Update blog by status 
 *     tags: [Blog]
 *     parameters:
 *          - in: header
 *            name: x-access-token
 *            description: Authorization header
 *            required: true
 *          - in: path
 *            name: blogId
 *            description: blogId
 *            required: true
 *            type: formData
 *     requestBody:
 *        content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties: 
 *                  title:
 *                     type: string
 *                     required: true    
 *                  description:
 *                     type: string
 *                     required: true 
 *                  isTopBlog:
 *                     type: boolean
 *                     required: true 
 * 
 * 
 *     responses:
 *       201:
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
 * /getAll/Blog:
 *   get:
 *     description: Get all blog 
 *     tags: [Blog]
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
 * /get-top/Blog:
 *   get:
 *     description: Get all top blog 
 *     tags: [Blog]
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
 * /get/Blog/{blogId}:
 *   get:
 *     description: Get blog by Id 
 *     tags: [Blog]
 *     parameters:
 *          - in: header
 *            name: x-access-token
 *            description: Authorization header
 *            required: true
 *          - in: path
 *            name: blogId
 *            description: blogId
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
  * /delete/Blog/{blogId}:
 *   delete:
 *     description: Delete blog 
 *     tags: [Blog]
 *     parameters:
 *          - in: header
 *            name: x-access-token
 *            description: Authorization header
 *            required: true
 *          - in: path
 *            name: blogId
 *            description: blogId
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

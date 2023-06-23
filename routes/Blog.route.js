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
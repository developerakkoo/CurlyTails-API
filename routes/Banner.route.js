const express = require('express');
const route = express.Router();
const BannerController = require('../controller/Banner.Controller');
const upload = require('../middleware/Upload');

route.post('/add/banner',upload.single('file'),BannerController.addBanner);


route.get('/getAll/banner',BannerController.getBanners);

route.get('/get/banner/:bannerId',BannerController.getBannerById);

route.put('/update/banner/:bannerId',upload.single('file'),BannerController.updateBanner);

route.delete('/delete/banner/:bannerId',BannerController.deleteBanner);

module.exports={BannerRoutes : route }
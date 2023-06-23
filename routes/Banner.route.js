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
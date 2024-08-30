const Banner = require("../models/Banner.model");
const deleteImage = require("../utils/deleteFile");

exports.addBanner = async (req, res) => {
    try {
        if (!req.file) {
            return res
                .status(400)
                .json({
                    message: "Please Provide Image File",
                    statusCode: 400,
                });
        }
        const { filename } = req.file;
        let image_url = `https://${req.hostname}/public/${filename}`;
        if (process.env.NODE_ENV !== "production") {
            image_url = `https://${req.hostname}:8000/public/${filename}`;
        }
        let bannerObj = {
            imageUrl: image_url
        };
        if (process.env.NODE_ENV !== "production") {
            bannerObj.imageUrl = `${req.protocol}://${
                req.hostname
            }:8000/${req.file.path.replace(/\\/g, "/")}`;
        }

        const banner = await Banner.create(bannerObj);
        res.status(201).json({
            message: "Banner Added Successfully",
            statusCode: 201,
            data: banner,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            statusCode: 500,
            status: "ERROR",
        });
    }
};

exports.getBanners = async (req, res, next) => {
    try {
        const banner = await Banner.find({});
        if (banner.length == 0) {
            return res
                .status(404)
                .json({
                    message: "Banner Not Found",
                    status: false,
                    statusCode: 404,
                });
        }
        res.status(200).json({
            message: "Banner Fetched Successfully",
            status: true,
            statusCode: 200,
            length: banner.length,
            data: banner,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            statusCode: 500,
            status: "ERROR",
        });
    }
};

exports.getBannerById = async (req, res, next) => {
    try {
        let banner = await Banner.findById(req.params.bannerId);
        if (!banner) {
            return res
                .status(404)
                .json({
                    message: "Banner Not Found",
                    status: false,
                    statusCode: 404,
                });
        }
        res.status(200).json({
            message: "Banner Fetched Successfully",
            status: true,
            statusCode: 200,
            data: banner,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            statusCode: 500,
            status: "ERROR",
        });
    }
};

exports.updateBanner = async (req, res, next) => {
    try {
        if (!req.file) {
            return res
                .status(400)
                .json({ msg: "Please attach a file", statusCode: 404 });
        }
        const imageUrl =
            req.protocol +
            "://" +
            req.hostname +
            "/" +
            req.file.path.replace(/\\/g, "/");
        const banner = await Banner.findOne({ _id: req.params.bannerId });
        if (!banner) {
            return res
                .status(404)
                .json({ msg: "Banner Not Found", statusCode: 404 });
        }
        //Removing Image From Server
        let temp = banner.imageUrl.split("http");
        let path = temp[1].split("://localhost");
        deleteImage.clearImage(path[1]);
        /********************************************************/
        banner.imageUrl = imageUrl != undefined ? imageUrl : banner.imageUrl;
        const updatedBanner = await banner.save();
        res.status(201).json({
            message: "Banner Updated Successfully",
            statusCode: 201,
            data: updatedBanner,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            statusCode: 500,
            status: "ERROR",
        });
    }
};

exports.deleteBanner = async (req, res, next) => {
    try {
        const banner = await Banner.findOne({ _id: req.params.bannerId });
        if (!banner) {
            return res
                .status(404)
                .json({ msg: "Banner Not Found", statusCode: 404 });
        }
        //Removing Image From Server
        let temp = banner.imageUrl.split("https");
        let path = temp[1].split("://api.curlietails.com");
        deleteImage.clearImage(path[1]);
        /********************************************************/
        await banner.deleteOne({ _id: req.params.bannerId });
        res.status(200).json({
            message: "Banner Deleted Successfully",
            statusCode: 200,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            statusCode: 500,
            status: "ERROR",
        });
    }
};

exports.isTopBanner = async (req, res, next) => {
    try {
        let banner = await Banner.findById(req.params.bannerId);
        if (!banner) {
            return res
                .status(404)
                .json({
                    message: "Banner Not Found",
                    status: false,
                    statusCode: 404,
                });
        }

        banner.isTopBanner =
            req.body.isTopBanner != undefined
                ? req.body.isTopBanner
                : banner.isTopBanner;

        banner.isTrendingBanner =
            req.body.isTrendingBanner != undefined
                ? req.body.isTrendingBanner
                : banner.isTrendingBanner;

        const updatedBanner = await banner.save();

        res.status(200).json({
            message: "Banner Fetched Successfully",
            status: true,
            statusCode: 200,
            data: updatedBanner,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            statusCode: 500,
            status: "ERROR",
        });
    }
};

exports.getTopBanner = async (req, res, next) => {
    try {
        let banner = await Banner.find({ isTopBanner: true });
        if (banner.length == 0) {
            return res.status(404).json({
                message: "Top Banner Not Found",
                status: false,
                statusCode: 404,
            });
        }
        res.status(200).json({
            message: "top Banner Fetched Successfully",
            status: true,
            statusCode: 200,
            data: banner,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            statusCode: 500,
            status: "ERROR",
        });
    }
};

exports.getTrendingBanner = async (req, res, next) => {
    try {
        let banner = await Banner.find({ isTrendingBanner: true });
        if (banner.length == 0) {
            return res.status(404).json({
                message: "Trending Banner Not Found",
                status: false,
                statusCode: 404,
            });
        }
        res.status(200).json({
            message: "Trending Banner Fetched Successfully",
            status: true,
            statusCode: 200,
            data: banner,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            statusCode: 500,
            status: "ERROR",
        });
    }
};

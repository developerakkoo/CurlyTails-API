const Products = require("../models/product.model");
const Favorite = require("../models/favorite.model");
const APIFeatures = require("../utils/ApiFeature");
const { apiResponse, asyncHandler } = require("../utils/helper.utils");
const { clearImage } = require("../utils/deleteFile");
const { generateCustomUuid } = require("custom-uuid");
const mongoose = require("mongoose");

exports.addProduct = async (req, res) => {
    try {
        const images = req.files;
        const links = await Promise.all(
            images.map(async (image) => {
                let image_url = `https://${req.hostname}/public/${image.filename}`;
                if (process.env.NODE_ENV !== "production") {
                    image_url = `https://${req.hostname}:8000/public/${image.filename}`;
                }

                return {
                    Id:
                        (await generateCustomUuid(
                            "012345678911223344ABCDEFGHIJKLMNOPQRSTUVWXYZ",
                            6,
                        )) + Math.ceil(Math.random() * 100000 + 1984567),
                    link: image_url,
                };
            }),
        );

        const productObj = {
            CategoryId: req.body.CategoryId,
            subCategoryId: req.body.subCategoryId,
            productCategoryId: req.body.productCategoryId,
            name: req.body.name,
            description: req.body.description,
            size: req.body.size,
            price: req.body.price,
            brand: req.body.brand,
            LifeStage: req.body.LifeStage,
            BreedSize: req.body.BreedSize,
            flavor: req.body.flavor,
            vegNonVeg: req.body.vegNonVeg,
            quantities: JSON.parse(req.body.quantities),
            isTopProduct: req.body.isTopProduct,
            isTrendingProduct: req.body.isTrendingProduct,
            images: links,
        };

        // console.log(req.files);
        // console.log(productObj);
        const createdProduct = await Products.create(productObj);
        res.status(201).json({
            message: "Product Created Successfully",
            statusCode: 201,
            data: createdProduct,
        });
    } catch (error) {
        console.log("====================================");
        console.log(error);
        console.log("====================================");
        res.status(500).json({
            message: error.message,
            statusCode: 500,
            status: "ERROR",
        });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const savedProduct = await Products.findOne({
            _id: req.params.productId,
        });
        if (!savedProduct) {
            return res
                .status(404)
                .json({ message: "Product Not Found", statusCode: 404 });
        }

        savedProduct.CategoryId =
            req.body.CategoryId != undefined
                ? req.body.CategoryId
                : savedProduct.CategoryId;

        savedProduct.subCategoryId =
            req.body.subCategoryId != undefined
                ? req.body.subCategoryId
                : savedProduct.subCategoryId;

        savedProduct.productCategoryId =
            req.body.productCategoryId != undefined
                ? req.body.productCategoryId
                : savedProduct.productCategoryId;

        savedProduct.name =
            req.body.name != undefined ? req.body.name : savedProduct.name;

        savedProduct.description =
            req.body.description != undefined
                ? req.body.description
                : savedProduct.description;

        savedProduct.size =
            req.body.size != undefined ? req.body.size : savedProduct.size;

        savedProduct.price =
            req.body.price != undefined ? req.body.price : savedProduct.price;

        savedProduct.isTrendingProduct =
            req.body.isTrendingProduct != undefined
                ? req.body.isTrendingProduct
                : savedProduct.isTrendingProduct;
        savedProduct.isTopProduct =
            req.body.isTopProduct != undefined
                ? req.body.isTopProduct
                : savedProduct.isTopProduct;
        const updatedProduct = await savedProduct.save();
        res.status(200).json({
            message: "Product Updated Successfully",
            statusCode: 200,
            data: updatedProduct,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            statusCode: 500,
            Status: "ERROR",
        });
    }
};

exports.updatedImage = async (req, res) => {
    try {
        const images = req.files;
        let links = [];
        const savedProduct = await Products.findOne({
            _id: req.params.productId,
        });
        for (let imagesNo = 0; imagesNo <= images.length - 1; imagesNo++) {
            let url = `${req.protocol}://${req.hostname}/${images[
                imagesNo
            ].path.replace(/\\/g, "/")}`;
            if (process.env.NODE_ENV !== "production") {
                url = `${req.protocol}://${req.hostname}:8000/${images[
                    imagesNo
                ].path.replace(/\\/g, "/")}`;
            }
            // let url =
            //   req.protocol +
            //   "://" +
            //   req.hostname +
            //   ":8000" +
            //   "/" +
            //   images[imagesNo].path.replace(/\\/g, "/");
            links.push({
                Id:
                    (await generateCustomUuid(
                        "012345678911223344ABCDEFGHIJKLMNOPQRSTUVWXYZ",
                        6,
                    )) + Math.ceil(Math.random() * 100000 + 1984567),
                link: url,
            });
        }
        links.forEach(async (element) => {
            savedProduct.images.push(element);
            await savedProduct.images.save();
        });
        // const updatedImages = await savedProduct.images.save();
        res.status(200).json({
            message: "Product Images Updated Successfully",
            statusCode: 200,
            data: savedProduct.images,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            statusCode: 500,
            Status: "ERROR",
        });
    }
};

exports.getAllProduct = async (req, res) => {
    try {
        const savedProduct = await Products.find();
        // if (savedProduct.length == 0) {
        // return res.status(404).json({message:'Products Not Found',statusCode:404});
        // }
        res.status(200).json({
            message: "Product Fetched Successfully",
            statusCode: 200,
            length: savedProduct.length,
            data: savedProduct,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            statusCode: 500,
            Status: "ERROR",
        });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const savedProduct = await Products.findOne({
            _id: req.params.productId,
        });
        if (!savedProduct) {
            return res.status(404).json({
                message: `Product Not Found With ProductId:${req.params.productId}`,
                statusCode: 404,
            });
        }
        res.status(200).json({
            message: "Product Fetched Successfully",
            statusCode: 200,
            data: savedProduct,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            statusCode: 500,
            Status: "ERROR",
        });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const savedProduct = await Products.findOne({
            _id: req.params.productId,
        });
        if (!savedProduct) {
            return res.status(404).json({
                message: `Product Not Found With ProductId:${req.params.productId}`,
                statusCode: 404,
            });
        }
        savedProduct.images.forEach((element) => {
            const url = element.link.split(`http://192.168.0.113:8000`); //local server
            // const url = element.split("https://localhost/");//live server
            // console.log(url);
            clearImage(url[1]);
        });
        await savedProduct.deleteOne({ _id: req.params.productId });
        res.status(200).json({
            message: `Product Deleted Successfully With ProductId:${req.params.productId}`,
            statusCode: 200,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            statusCode: 500,
            Status: "ERROR",
        });
    }
};

exports.getProductByCategoryId = async (req, res) => {
    try {
        const savedProduct = await Products.find({
            CategoryId: req.params.CategoryId,
        }).populate(["subCategoryId", "productCategoryId"]);
        const brands = await Products.distinct("brand");
        const flavor = await Products.distinct("flavor");
        const BreedSize = await Products.distinct("BreedSize");
        const LifeStage = await Products.distinct("LifeStage");

        if (savedProduct.length == 0) {
            return res.status(404).json({
                message: `Product Not Found With CategoryId:${req.params.CategoryId}`,
                statusCode: 404,
            });
        }

        res.status(200).json({
            message: "Products Fetched Successfully",
            statusCode: 200,
            length: savedProduct.length,
            savedProduct,
            filterData: {
                brands,
                flavor,
                BreedSize,
                LifeStage,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            statusCode: 500,
            Status: "ERROR",
        });
    }
};

exports.productFilter = async (req, res) => {
    try {
        const {
            brand,
            q,
            flavor,
            lifeStage,
            breedSize,
            productCategoryId,
            vegNonVeg,
            lowerPrice,
            upperPrice,
            categoryId,
        } = req.query;
        const { userId } = req.params; // Get the userId from request params

        // Construct the base query for products
        let dbQuery = {};
        if (categoryId) {
            dbQuery.CategoryId = categoryId;
        }
        if (lifeStage) {
            dbQuery.LifeStage = new RegExp(lifeStage, "i");
        }
        if (flavor) {
            dbQuery.flavor = new RegExp(flavor, "i");
        }
        if (brand) {
            dbQuery.brand = new RegExp(brand, "i");
        }
        if (breedSize) {
            dbQuery.BreedSize = new RegExp(breedSize, "i");
        }
        if (productCategoryId) {
            dbQuery.productCategoryId = productCategoryId;
        }
        if (vegNonVeg) {
            dbQuery.vegNonVeg = new RegExp(vegNonVeg, "i");
        }
        if (lowerPrice && upperPrice) {
            dbQuery.price = {
                $gte: lowerPrice,
                $lte: upperPrice,
            };
        }

        // Aggregate products with average rating
        const productsWithRatings = await Products.aggregate([
            {
                $match: dbQuery,
            },
            {
                $lookup: {
                    from: "productrattings", // Name of the ratings collection
                    localField: "_id",
                    foreignField: "productId",
                    as: "ratings",
                },
            },
            {
                $addFields: {
                    averageRating: {
                        $ifNull: [
                            {
                                $avg: "$ratings.star",
                            },
                            0, // Default value if no ratings are present
                        ],
                    },
                },
            },
            {
                $lookup: {
                    from: "favorites", // Name of the favorites collection
                    let: { product_id: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$productId", "$$product_id"] },
                                        {
                                            $eq: [
                                                "$userId",
                                                new mongoose.Types.ObjectId(userId),
                                            ],
                                        },
                                    ],
                                },
                            },
                        },
                    ],
                    as: "favorites",
                },
            },
            {
                $addFields: {
                    isFavorite: {
                        $cond: [
                            { $gt: [{ $size: "$favorites" }, 0] },
                            true,
                            false,
                        ],
                    },
                },
            },
            {
                $project: {
                    ratings: 0, // Optionally exclude ratings field if not needed
                    favorites: 0, // Optionally exclude favorites field if not needed
                },
            },
        ]);

        res.status(200).json({
            message: "Products Fetched Successfully",
            statusCode: 200,
            length: productsWithRatings.length,
            data: productsWithRatings,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            statusCode: 500,
            Status: "ERROR",
        });
    }
};

exports.getProductBySubCategoryId = async (req, res) => {
    try {
        const savedProduct = await Products.find({
            subCategoryId: req.params.subCategoryId,
        });
        if (!savedProduct) {
            return res.status(404).json({
                message: `Product Not Found With SubCategoryId:${req.params.subCategoryId}`,
                statusCode: 404,
            });
        }
        res.status(200).json({
            message: "Products Fetched Successfully",
            statusCode: 200,
            length: savedProduct.length,
            savedProduct,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            statusCode: 500,
            Status: "ERROR",
        });
    }
};

exports.getProductByProductCategoryId = async (req, res) => {
    try {
        const savedProduct = await Products.find({
            productCategoryId: req.params.productCategoryId,
        });
        if (!savedProduct[0]) {
            return res.status(404).json({
                message: `Product Not Found With ProductCategoryId:${req.params.productCategoryId}`,
                statusCode: 404,
            });
        }
        res.status(200).json({
            message: "Products Fetched Successfully",
            statusCode: 200,
            length: savedProduct.length,
            data: savedProduct,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            statusCode: 500,
            Status: "ERROR",
        });
    }
};

exports.ProductSearchOption = async (req, res, next) => {
    try {
        const { q } = req.query;
        // const term = req.query.term;
        // console.log(name);
        // const product = await Products.find({ $text: { $search: name} });
        const dbQuery = {
            $or: [
                { name: { $regex: `.*${q}.*`, $options: "i" } },
                { flavor: { $regex: `${q}`, $options: "i" } },
                { brand: { $regex: `${q}`, $options: "i" } },
                { description: { $regex: `${q}`, $options: "i" } },
                { flavor: { $regex: `.*${q}.*`, $options: "i" } },
                { vegNonVeg: { $regex: `${q}`, $options: "i" } },
            ],
        };

        const product = await Products.find(dbQuery);

        res.status(200).json({
            message: "Product Fetched Successfully",
            status: "success",
            statusCode: 200,
            results: product.length,
            searchData: product,
        });
    } catch (err) {
        console.log(err);
        res.status(404).json({
            message: err.message,
            statusCode: 404,
            status: `ERROR`,
        });
    }
};

exports.getTopProduct = async (req, res) => {
    try {
        const savedProduct = await Products.find({ isTopProduct: true }).select(
            "-__v",
        );
        if (savedProduct.length == 0) {
            return res
                .status(404)
                .json({ message: "Top Products Not Found", statusCode: 404 });
        }
        res.status(200).json({
            message: "Top Product Fetched Successfully",
            statusCode: 200,
            length: savedProduct.length,
            data: savedProduct,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            statusCode: 500,
            Status: "ERROR",
        });
    }
};

exports.getTrendingProduct = async (req, res) => {
    try {
        const savedProduct = await Products.find({
            isTrendingProduct: true,
        }).select("-__v");
        if (savedProduct.length == 0) {
            return res.status(404).json({
                message: "Trending Products Not Found",
                statusCode: 404,
            });
        }
        res.status(200).json({
            message: "Trending Product Fetched Successfully",
            statusCode: 200,
            length: savedProduct.length,
            data: savedProduct,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            statusCode: 500,
            Status: "ERROR",
        });
    }
};

exports.deleteImage = async (req, res) => {
    try {
        const savedProduct = await Products.findOne({
            _id: req.params.productId,
        });
        const itemToBeRemoved = req.params.imageId.toString();
        if (!savedProduct) {
            return res.status(404).json({
                message: `Product Not Found With ProductId:${req.body.productId}`,
                statusCode: 404,
            });
        }
        const updatedImageArr = savedProduct.images.filter(
            (todoItem) => todoItem.Id !== itemToBeRemoved,
        );
        savedProduct.images.forEach((element) => {
            if (element.Id == itemToBeRemoved) {
                const url = element.link.split(`http://192.168.0.113:8000`); //local server
                //const url = element.link.split(`http://192.168.0.113:8000`);//local server
                console.log("image need to remove", url);
                clearImage(url[1]);
            }
        });
        savedProduct.images = updatedImageArr;
        const savedImg = await savedProduct.save();
        res.status(200).json({
            message: `Product Image Deleted Successfully`,
            data: savedImg,
            statusCode: 200,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            statusCode: 500,
            Status: "ERROR",
        });
    }
};

exports.getFilterValues = asyncHandler(async (req, res) => {
    // Fetch distinct values for each field
    const [
        brands,
        lifeStages,
        breedSizes,
        flavors,
        vegNonVegOptions,
        priceRange,
    ] = await Promise.all([
        Products.distinct("brand").exec(),
        Products.distinct("LifeStage").exec(),
        Products.distinct("BreedSize").exec(),
        Products.distinct("flavor").exec(),
        Products.distinct("vegNonVeg").exec(),
        Products.aggregate([
            { $unwind: "$quantities" },
            {
                $group: {
                    _id: null,
                    minPrice: { $min: "$quantities.price" },
                    maxPrice: { $max: "$quantities.price" },
                },
            },
        ]).exec(),
    ]);

    const minPrice = priceRange[0] ? priceRange[0].minPrice : 0;
    const maxPrice = priceRange[0] ? priceRange[0].maxPrice : 0;

    res.status(200).json(
        new apiResponse(
            200,
            {
                brands,
                lifeStages,
                breedSizes,
                flavors,
                vegNonVegOptions,
                priceRange: { min: minPrice, max: maxPrice },
            },
            "Filter data fetched successfully",
        ),
    );
});

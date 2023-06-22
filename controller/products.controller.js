const Products = require('../models/product.model');
const APIFeatures = require('../utils/ApiFeature')


exports.addProduct = async(req,res)=>{
    try {
        const images= req.files
        let links = [];
        
        for (let imagesNo=0; imagesNo <=images.length-1;imagesNo++){
            let url = req.protocol +"://"+req.hostname +"/"+images[imagesNo].path.replace(/\\/g, "/")
            links.push(url)
        }
        const productObj ={
            CategoryId:req.body.CategoryId,
            subCategoryId:req.body.subCategoryId,
            productCategoryId:req.body.productCategoryId,
            name:req.body.name,
            description:req.body.description,
            size:req.body.size,
            price:req.body.price,
            brand:req.body.brand,
            LifeStage:req.body.LifeStage,
            BreedSize:req.body.BreedSize,
            flavor:req.body.flavor,
            vegNonVeg:req.body.vegNonVeg,
            images:links
        }
        // console.log(req.files);
        // console.log(productObj);
        const createdProduct = await Products.create(productObj);
        res.status(200).json({message:'Product Created Successfully',statusCode:200,data:createdProduct});
    } catch (error) {
        res.status(500).json({message:error.message,statusCode:500,status:'ERROR'});
    }
}

exports.updateProduct = async(req,res)=>{
    try {
        const savedProduct = await Products.findOne({_id:req.params.productId});
        if (!savedProduct) {
            return res.status(404).json({message:'Product Not Found',statusCode:404});
        }

        savedProduct.CategoryId = req.body.CategoryId != undefined
        ? req.body.CategoryId
        :savedProduct.CategoryId

        savedProduct.subCategoryId = req.body.subCategoryId != undefined
        ? req.body.subCategoryId
        :savedProduct.subCategoryId

        savedProduct.productCategoryId = req.body.productCategoryId != undefined
        ? req.body.productCategoryId
        :savedProduct.productCategoryId

        savedProduct.name = req.body.name != undefined
        ? req.body.name
        :savedProduct.name

        savedProduct.description = req.body.description != undefined
        ? req.body.description
        :savedProduct.description

        savedProduct.size = req.body.size != undefined
        ? req.body.size
        :savedProduct.size

        savedProduct.price = req.body.price != undefined
        ? req.body.price
        :savedProduct.price

        const updatedProduct = await savedProduct.save();
        res.status(200).json({message:'Product Updated Successfully',statusCode:200,data:updatedProduct});
    } catch (error) {
        res.status(500).json({message:error.message,statusCode:500,Status:'ERROR'});
    }
}

exports.getAllProduct = async (req,res)=>{
    try {
        const savedProduct = await Products.find();
        if (savedProduct.length == 0) {
        return res.status(404).json({message:'Products Not Found',statusCode:404});
        }
        res.status(200).json({message:'Product Fetched Successfully',statusCode:200,length:savedProduct.length,data:savedProduct});
    } catch (error) {
    res.status(500).json({message:error.message,statusCode:500,Status:'ERROR'});
    }
}


exports.getProductById = async (req,res)=>{
    try {
        const savedProduct = await Products.findOne({_id:req.params.productId});
        if (!savedProduct) {
        return res.status(404).json({message:`Product Not Found With ProductId:${req.params.productId}`,statusCode:404});
        }
        res.status(200).json({message:'Product Fetched Successfully',statusCode:200,data:savedProduct});
    } catch (error) {
    res.status(500).json({message:error.message,statusCode:500,Status:'ERROR'});
    }
}


exports.deleteProduct = async (req,res)=>{
    try {
        const savedProduct = await Products.findOne({_id:req.params.productId});
        if (!savedProduct) {
        return res.status(404).json({message:`Product Not Found With ProductId:${req.params.productId}`,statusCode:404});
        }
        await savedProduct.deleteOne({_id:req.params.productId});

        res.status(200).json({message:`Product Deleted Successfully With ProductId:${req.params.productId}`,statusCode:200});
    } catch (error) {
    res.status(500).json({message:error.message,statusCode:500,Status:'ERROR'});
    }
}

exports.getProductByCategoryId= async (req,res)=>{
    try {
        const savedProduct = await Products.find({CategoryId:req.params.CategoryId});
        if (savedProduct.length == 0) {
        return res.status(404).json({message:`Product Not Found With CategoryId:${req.params.CategoryId}`,statusCode:404});
        }
        res.status(200).json({message:'Products Fetched Successfully',statusCode:200,length:savedProduct.length,data:savedProduct});
    } catch (error) {
    res.status(500).json({message:error.message,statusCode:500,Status:'ERROR'});
    }
}

exports.getProductBySubCategoryId = async (req,res)=>{
    try {
        const savedProduct = await Products.find({subCategoryId:req.params.subCategoryId});
        if (!savedProduct) {
        return res.status(404).json({message:`Product Not Found With SubCategoryId:${req.params.subCategoryId}`,statusCode:404});
        }
        res.status(200).json({message:'Products Fetched Successfully',statusCode:200,length:savedProduct.length,savedProduct});
    } catch (error) {
    res.status(500).json({message:error.message,statusCode:500,Status:'ERROR'});
    }
}

exports.getProductByProductCategoryId = async (req,res)=>{
    try {
        const savedProduct = await Products.find({productCategoryId:req.params.productCategoryId});
        if (!savedProduct[0]) {
        return res.status(404).json({message:`Product Not Found With ProductCategoryId:${req.params.productCategoryId}`,statusCode:404});
        }
        res.status(200).json({message:'Products Fetched Successfully',statusCode:200,length:savedProduct.length,savedProduct});
    } catch (error) {
    res.status(500).json({message:error.message,statusCode:500,Status:'ERROR'});
    }
}

exports.ProductSearchOption = async (req, res, next)=> {

    try {
        const query = req.query.query;
        const term = req.query.term;
        console.log(query + term);
        const features = await new APIFeatures(Products.find(), req.query)
        .filter()
        .sort()

        const product = await features.query;

        res.status(200).json({
        message:'Product Fetched Successfully',
        status: "success",
        statusCode: 200,
        results: product.length,
        searchData: product,
        });
    } catch (err) {
        console.log(err)
    res.status(404).json({message: err.message, statusCode:404,status:`ERROR`});
    }
};


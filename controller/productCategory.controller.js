const productCategory = require('../models/productCategory.model');
const subCategory =require('../models/subCategory.model');
const Category =require('../models/category.model');

exports.addProductCategory = async(req,res)=>{
    try {
        const dataObj={
            CategoryId:req.body.CategoryId,
            subCategoryId:req.body.subCategoryId,
            name:req.body.name,
            description:req.body.description
        }
        const savedCategory = await Category.findOne({_id:req.body.CategoryId});
        if (!savedCategory) {
        return res.status(404).json({message:`Category Not Found With This Id:${req.body.CategoryId}`,statusCode:404});
        }
        const savedSubCategory = await subCategory.findOne({_id:req.body.subCategoryId});
        if (!savedSubCategory) {
        return res.status(404).json({message:`subCategory Not Found With This Id:${req.body.subCategoryId}`,statusCode:404});
        }
        const savedProductCategory = await productCategory.findOne({name:req.body.name});
        if (savedProductCategory) {
            return res.status(400).json({message:`Product Category Already Exist with Name:${req.body.name}, Please Try With Different Name `,statusCode:400});
            }
        const createdProductCategory = await productCategory.create(dataObj);
        res.status(200).json({message:'Product Category Created Successfully!',statusCode:200,data:createdProductCategory});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message,statusCode:500,status:'ERROR'});
    }
}

exports.updateProductCategory = async(req,res)=>{
    try {
        const savedProductCategory = await productCategory.findOne({_id:req.params.productCategoryId});
        if (!savedProductCategory) {
        return res.status(404).json({message:`product Category Not Found With This Id:${req.params.productCategoryId}`,statusCode:404});
        }
        savedProductCategory.CategoryId = req.body.CategoryId != undefined
        ? req.body.CategoryId
        :savedProductCategory.CategoryId
        savedProductCategory.subCategoryId = req.body.subCategoryId != undefined
        ? req.body.subCategoryId
        :savedProductCategory.subCategoryId
        savedProductCategory.name = req.body.name != undefined
        ? req.body.name
        :savedProductCategory.name
        savedProductCategory.description = req.body.description != undefined
        ? req.body.description
        :savedProductCategory.description 
        
        const updatedProductCategory = await savedProductCategory.save();

        res.status(201).json({message:'Product Category Updated Successfully',statusCode:201,data:updatedProductCategory});
        
    } catch (error) {
        if(err.code == 11000){
            return res.status(400).json({message: `Product Category Already Exist with Name:${req.body.name}, Please Try With Different Name `,statusCode:400 })
        }
        res.status(500).json({message:error.message,statusCode:500,status:'ERROR'});
    }
}

exports.getAllProductCategory = async(req,res)=>{
    try {
        const savedProductCategory =  await productCategory.find().populate('CategoryId') .populate('subCategoryId')
        if (savedProductCategory.length == 0) {
        return res.status(404).json({message:'Product Category Not found',statusCode:404})
        }
        res.status(200).json({message:'Product Category Fetched Successfully',statusCode:200,length:savedProductCategory.length,data:savedProductCategory});
    } catch (error) {
        res.status(500).json({message:error.message,statusCode:500,status:'ERROR'});
    }
}

exports.getProductCategoryById = async(req,res)=>{
    try {
        const savedProductCategory =  await productCategory.findOne({_id:req.params.productCategoryId}).populate('CategoryId') .populate('subCategoryId');
        if (!savedProductCategory) {
        return res.status(404).json({message:'Product Category Not found',statusCode:404});
        }
        res.status(200).json({message:'Product Category Fetched Successfully',statusCode:200,data:savedProductCategory});
    } catch (error) {
        res.status(500).json({message:error.message,statusCode:500,status:'ERROR'});
    }
}

exports.deleteProductCategory = async(req,res)=>{
    try {
        const savedProductCategory =  await productCategory.findOne({_id:req.params.productCategoryId})
        if (!savedProductCategory) {
        return res.status(404).json({message:'Product Category Not found',statusCode:404})
        }
        await savedProductCategory.deleteOne({_id:req.params.productCategoryId})
        res.status(200).json({message:'Product Category Deleted Successfully',statusCode:200});
    } catch (error) {
        res.status(500).json({message:error.message,statusCode:500,status:'ERROR'});
    }
}


exports.getProductCategoryByCategoryId = async(req,res)=>{
    try {
        const savedProductCategory =  await productCategory.find({CategoryId:req.params.CategoryId}).populate('CategoryId');
        if (savedProductCategory.length == 0) {
        return res.status(404).json({message:`Product Category Not found With This Category ID:${req.params.CategoryId}`,statusCode:404})
        }
        res.status(200).json({message:'Product Category Fetched Successfully',statusCode:200,length:savedProductCategory.length,data:savedProductCategory});
    } catch (error) {
        res.status(500).json({message:error.message,statusCode:500,status:'ERROR'});
    }
}

exports.getProductCategoryBySubCategoryId = async(req,res)=>{
    try {
        const savedProductCategory =  await productCategory.find({subCategoryId:req.params.subCategoryId}).populate('subCategoryId');
        if (savedProductCategory.length == 0) {
        return res.status(404).json({message:`Product Category Not found With This subCategory ID:${req.params.subCategoryId}`,statusCode:404})
        }
        res.status(200).json({message:'Product Category Fetched Successfully',statusCode:200,length:savedProductCategory.length,data:savedProductCategory});
    } catch (error) {
        res.status(500).json({message:error.message,statusCode:500,status:'ERROR'});
    }
}
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
        return res.status(404).json({message:`Category Not Found With This Id:${req.body.CategoryId}`});
        }
        const savedSubCategory = await subCategory.findOne({_id:req.body.subCategoryId});
        if (!savedSubCategory) {
        return res.status(404).json({message:`subCategory Not Found With This Id:${req.body.subCategoryId}`});
        }
        const savedProductCategory = await productCategory.findOne({name:req.body.name});
        if (savedProductCategory) {
            return res.status(404).json({message:`Product Category Already Exist with Name:${req.body.name}, Please Try With Different Name `});
            }
        const createdProductCategory = await productCategory.create(dataObj);
        res.status(201).json({message:'Product Category Created Successfully!',createdProductCategory});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message,status:'ERROR'});
    }
}

exports.updateProductCategory = async(req,res)=>{
    try {
        const savedProductCategory = await productCategory.findOne({_id:req.params.productCategoryId});
        if (!savedProductCategory) {
        return res.status(404).json({message:`product Category Not Found With This Id:${req.params.productCategoryId}`});
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

        res.status(200).json({message:'Product Category Updated Successfully',updatedProductCategory});
        
    } catch (error) {
        if(err.code == 11000){
            return res.status(400).json({message: `Product Category Already Exist with Name:${req.body.name}, Please Try With Different Name ` })
        }
        res.status(500).json({message:error.message,status:'ERROR'});
    }
}

exports.getAllProductCategory = async(req,res)=>{
    try {
        const savedProductCategory =  await productCategory.find().populate('CategoryId');
        if (!savedProductCategory) {
        return res.status(404).json({message:'Product Category Not found'})
        }
        res.status(200).json({message:'Product Category Fetched Successfully',count:savedProductCategory.length,savedProductCategory});
    } catch (error) {
        res.status(500).json({message:error.message,status:'ERROR'});
    }
}

exports.getProductCategoryById = async(req,res)=>{
    try {
        const savedProductCategory =  await productCategory.findOne({_id:req.params.productCategoryId}).populate('CategoryId','subCategoryId');
        if (!savedProductCategory) {
        return res.status(404).json({message:'Product Category Not found'})
        }
        res.status(200).json({message:'Product Category Fetched Successfully',savedProductCategory});
    } catch (error) {
        res.status(500).json({message:error.message,status:'ERROR'});
    }
}

exports.deleteProductCategory = async(req,res)=>{
    try {
        const savedProductCategory =  await productCategory.findOne({_id:req.params.productCategoryId})
        if (!savedProductCategory) {
        return res.status(404).json({message:'Product Category Not found'})
        }
        await savedProductCategory.deleteOne({_id:req.params.productCategoryId})
        res.status(200).json({message:'Product Category Deleted Successfully'});
    } catch (error) {
        res.status(500).json({message:error.message,status:'ERROR'});
    }
}


exports.getProductCategoryByCategoryId = async(req,res)=>{
    try {
        const savedProductCategory =  await productCategory.find({CategoryId:req.params.CategoryId}).populate('CategoryId');
        if (!savedProductCategory) {
        return res.status(404).json({message:'Product Category Not found'})
        }
        res.status(200).json({message:'Product Category Fetched Successfully',savedProductCategory});
    } catch (error) {
        res.status(500).json({message:error.message,status:'ERROR'});
    }
}

exports.getProductCategoryBySubCategoryId = async(req,res)=>{
    try {
        const savedProductCategory =  await productCategory.find({subCategoryId:req.params.subCategoryId}).populate('subCategoryId');
        if (!savedProductCategory) {
        return res.status(404).json({message:'Product Category Not found'})
        }
        res.status(200).json({message:'Product Category Fetched Successfully',savedProductCategory});
    } catch (error) {
        res.status(500).json({message:error.message,status:'ERROR'});
    }
}
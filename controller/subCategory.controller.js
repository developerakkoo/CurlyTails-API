const subCategory =require('../models/subCategory.model');
const Category =require('../models/category.model');

exports.addSubCategory = async(req,res)=>{
    try {
        const dataObj={
            CategoryId:req.body.CategoryId,
            name:req.body.name,
            description:req.body.description
        }
        const savedCategory = await Category.findOne({_id:req.body.CategoryId});
        if (!savedCategory) {
        return res.status(404).json({message:`CategoryId Not Found With This Id:${req.params.subCategoryId}`});
        }
        const savedSubCategory = await subCategory.findOne({name:req.body.name});
        if (savedSubCategory) {
            return res.status(404).json({message:`Sub Category Already Exist with Name:${req.body.name}, Please Try With Different Name`});
            }
        const createdSubCategory = await subCategory.create(dataObj);
        res.status(201).json({message:'subCategory Created Successfully!',createdSubCategory});
    } catch (error) {
        res.status(500).json({message:error.message,status:'ERROR'});
    }
}

exports.updateSubCategory = async(req,res)=>{
    try {
        const savedSubCategory = await subCategory.findOne({_id:req.params.subCategoryId});
        if (!savedSubCategory) {
        return res.status(404).json({message:`subCategory Not Found With This Id:${req.params.subCategoryId}`});
        }
        savedSubCategory.CategoryId = req.body.CategoryId != undefined
        ? req.body.CategoryId
        :savedSubCategory.CategoryId 
        savedSubCategory.name = req.body.name != undefined
        ? req.body.name
        :savedSubCategory.name
        savedSubCategory.description = req.body.description != undefined
        ? req.body.description
        :savedSubCategory.description 
        
        const updatedSubCategory = await savedSubCategory.save();

        res.status(200).json({message:'subCategory Updated Successfully',updatedSubCategory});
        
    } catch (error) {
        if(err.code == 11000){
            return res.status(400).json({message: `Sub Category Already Exist With Name:${req.body.name}, Please Try With Different Name` })
        }
        res.status(500).json({message:error.message,status:'ERROR'});
    }
}

exports.getAllSubCategory = async(req,res)=>{
    try {
        const savedSubCategory =  await subCategory.find().populate('CategoryId');
        if (!savedSubCategory) {
        return res.status(404).json({message:'subCategory Not found'})
        }
        res.status(200).json({message:'subCategory Fetched Successfully',count:savedSubCategory.length,savedSubCategory});
    } catch (error) {
        res.status(500).json({message:error.message,status:'ERROR'});
    }
}

exports.getSubCategoryById = async(req,res)=>{
    try {
        const savedSubCategory =  await subCategory.findOne({_id:req.params.subCategoryId}).populate('CategoryId');
        if (!savedSubCategory) {
        return res.status(404).json({message:'subCategory Not found'})
        }
        res.status(200).json({message:'subCategory Fetched Successfully',savedSubCategory});
    } catch (error) {
        res.status(500).json({message:error.message,status:'ERROR'});
    }
}

exports.deleteSubCategory = async(req,res)=>{
    try {
        const savedCategory =  await subCategory.findOne({_id:req.params.subCategoryId})
        if (!savedCategory) {
        return res.status(404).json({message:'subCategory Not found'})
        }
        await savedCategory.deleteOne({_id:req.params.subCategoryId})
        res.status(200).json({message:'subCategory Deleted Successfully'});
    } catch (error) {
        res.status(500).json({message:error.message,status:'ERROR'});
    }
}


exports.getSubCategoryByCategoryId = async(req,res)=>{
    try {
        const savedSubCategory =  await subCategory.find({CategoryId:req.params.CategoryId}).populate('CategoryId');
        if (!savedSubCategory) {
        return res.status(404).json({message:'subCategory Not found'})
        }
        res.status(200).json({message:'subCategory Fetched Successfully',savedSubCategory});
    } catch (error) {
        res.status(500).json({message:error.message,status:'ERROR'});
    }
}
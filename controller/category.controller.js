const Category =require('../models/category.model');


exports.addCategory = async(req,res)=>{
    try {
        const dataObj={
            name:req.body.name,
            description:req.body.description
        }
        
        const savedCategory = await Category.findOne({name:req.body.name});
        if (savedCategory) {
        return res.status(404).json({message:`Category Already Exist with Name:${req.body.name}, Please Try With Different Name `});
        }
        const createdCategory = await Category.create(dataObj);
        res.status(201).json({message:'Category Created Successfully!',createdCategory});
    } catch (error) {
        res.status(500).json({message:error.message,status:'ERROR'});
    }
}

exports.updateCategory = async(req,res)=>{
    try {
        const savedCategory = await Category.findOne({_id:req.params.categoryId});
        if (!savedCategory) {
        return res.status(404).json({message:`Category Not Found With This Id:${req.params.categoryId}`});
        }
        savedCategory.name = req.body.name != undefined
        ? req.body.name
        :savedCategory.name
        savedCategory.description = req.body.description != undefined
        ? req.body.description
        :savedCategory.description 
        
        const updatedCategory = await savedCategory.save();

        res.status(200).json({message:'Category Updated Successfully',updatedCategory});
        
    } catch (error) {
        console.log(error);
        if(err.code == 11000){
            return res.status(400).json({message: `Category Already Exist with Name:${req.body.name}, Please Try With Different Name` })
        }
        res.status(500).json({message:error.message,status:'ERROR'});
    }
}

exports.getAllCategory = async(req,res)=>{
    try {
        const savedCategory =  await Category.find();
        if (!savedCategory) {
        return res.status(404).json({message:'Category Not found'})
        }
        res.status(200).json({message:'Category Fetched Successfully',count:savedCategory.length,savedCategory});
    } catch (error) {
        res.status(500).json({message:error.message,status:'ERROR'});
    }
}

exports.getCategoryById = async(req,res)=>{
    try {
        const savedCategory =  await Category.findOne({_id:req.params.categoryId});
        if (!savedCategory) {
        return res.status(404).json({message:'Category Not found'})
        }
        res.status(200).json({message:'Category Fetched Successfully',savedCategory});
    } catch (error) {
        res.status(500).json({message:error.message,status:'ERROR'});
    }
}

exports.deleteCategory = async(req,res)=>{
    try {
        const savedCategory =  await Category.findOne({_id:req.params.categoryId});
        if (!savedCategory) {
        return res.status(404).json({message:'Category Not found'})
        }
        await savedCategory.deleteOne({_id:req.params.categoryId})
        res.status(200).json({message:'Category Deleted Successfully'});
    } catch (error) {
        res.status(500).json({message:error.message,status:'ERROR'});
    }
}
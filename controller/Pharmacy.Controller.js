const Pharmacy = require('../models/pharmacy.model');
const deleteImage = require('../utils/deleteFile');

exports.postPharmacy = async (req,res) =>{
    try {
        const dataObj = {
            BrandName : req.body.BrandName,
            medicineName : req.body.medicineName,
            description :req.body.description,
            price:req.body.price,
            Stock:req.body.Stock
        }
        const createdPharmacy = await Pharmacy.create(dataObj);
        res.status(201).json({message:'Pharmacy Added Successfully',statusCode:201,data:createdPharmacy});
    } catch (error) {
        res.status(500).json({message:error.message,statusCode:500,status:'ERROR'});
    }
}

exports.updateImage = async(req,res) => {
    try {
        if (!req.file) {
            return res.status(400).json({msg: "Please attach a file",statusCode:404});
        }
        const imageUrl = req.protocol +"://"+req.hostname +"/"+req.file.path.replace(/\\/g, "/")
        const savedPharmacy = await Pharmacy.findOne({_id:req.params.pharmacyId});
        if (!savedPharmacy) {
            return res.status(404).json({message: "Pharmacy Not Found",statusCode:404});
        }
        //Removing Image From Server
        if (savedPharmacy.imageUrl) {
            let temp = savedPharmacy.imageUrl.split('http')
            let path = temp[1].split('://localhost');
            deleteImage.clearImage(path[1]);
        }

/********************************************************/   
        savedPharmacy.imageUrl = imageUrl!= undefined
        ? imageUrl
        :savedPharmacy.imageUrl 
        const updatedPharmacy  = await savedPharmacy.save()         
        res.status(201).json({
                message:"Pharmacy Image  Updated Successfully",
                statusCode:201,
                data:updatedPharmacy
            })
    } catch (error) {
        res.status(500).json({message:error.message,statusCode:500,status:'ERROR'});
    }
}


exports.getAllPharmacy = async(req,res) =>{
    try {
        const savedPharmacy = await Pharmacy.find();
        if (savedPharmacy.length == 0) {
            return res.status(404).json({message:'Pharmacy Not Found',statusCode:404});
        }
        res.status(200).json({message:'Pharmacy Fetched Successfully',statusCode:200,data:savedPharmacy});
    } catch (error) {
        res.status(500).json({message:error.message,statusCode:500,status:'ERROR'});
    }
}

exports.getPharmacyById = async(req,res) =>{
    try {
        const savedPharmacy = await Pharmacy.find({_id:req.params.pharmacyId});
        if (!savedPharmacy.length) {
            return res.status(404).json({message:'Pharmacy Not Found',statusCode:404});
        }
        res.status(200).json({message:'Pharmacy Fetched Successfully',statusCode:200,data:savedPharmacy});
    } catch (error) {
        res.status(500).json({message:error.message,statusCode:500,status:'ERROR'});
    }
}


exports.updatedPharmacy= async(req,res) =>{
    try {
        const savedPharmacy = await Pharmacy.findOne({_id:req.params.pharmacyId});
        if (!savedPharmacy) {
            return res.status(404).json({message:'Pharmacy Not Found',statusCode:404});
        }
        savedPharmacy.BrandName = req.body.BrandName != undefined
        ? req.body.BrandName
        :savedPharmacy.BrandName

        savedPharmacy.medicineName = req.body.medicineName != undefined
        ? req.body.medicineName
        :savedPharmacy.medicineName

        savedPharmacy.description = req.body.description != undefined
        ? req.body.description
        :savedPharmacy.description

        savedPharmacy.price = req.body.price != undefined
        ? req.body.price
        :savedPharmacy.price

        savedPharmacy.Stock = req.body.Stock != undefined
        ? req.body.Stock
        :savedPharmacy.Stock

        savedPharmacy.inStock = req.body.inStock != undefined
        ? req.body.inStock
        :savedPharmacy.inStock

        const updatedPharmacy = await savedPharmacy.save()

        res.status(200).json({message:'Pharmacy Updated Successfully',statusCode:200,data:updatedPharmacy});
    } catch (error) {
        res.status(500).json({message:error.message,statusCode:500,status:'ERROR'});
    }
}



exports.deletePharmacy = async(req,res) => {
    try {
        
        const savedPharmacy = await Pharmacy.findOne({_id:req.params.pharmacyId});
        if (!savedPharmacy) {
            return res.status(404).json({message: "Pharmacy Not Found",statusCode:404});
        }
        //Removing Image From Server
        if (savedPharmacy.imageUrl) {
            let temp = savedPharmacy.imageUrl.split('http')
            let path = temp[1].split('://localhost');
            deleteImage.clearImage(path[1]);
        }

/********************************************************/   
        await savedPharmacy.deleteOne()         
        res.status(200).json({
                message:"Pharmacy Deleted Successfully",
                statusCode:200
            })
    } catch (error) {
        res.status(500).json({message:error.message,statusCode:500,status:'ERROR'});
    }
}
const Consultant = require('../models/Consultant.model');
const deleteImage = require('../utils/deleteFile');

exports.addConsultant = async (req,res) => {
    try {
        const dataObj = {
            Name:req.body.name,
            expertise:req.body.expertise,
            description:req.body.description,
        }
        const createdConsultant = await Consultant.create(dataObj);
        res.status(200).json({message:'Consultant Created Successfully',statusCode:200,data:createdConsultant});
    } catch (error) {
        res.status(500).json({message:error.message,statusCode:500,status:'ERROR'});
    }
}

exports.addConsultantImage = async (req,res) =>{
    try {
        const dataObj = {
            imageUrl:req.protocol +"://"+req.hostname +"/"+req.file.path.replace(/\\/g, "/")
        }
        const createdConsultant = await Consultant.create(dataObj);
        res.status(200).json({message:'Consultant Image Added Successfully',statusCode:200,data:createdConsultant});
    } catch (error) {
        res.status(500).json({message:error.message,statusCode:500,status:'ERROR'});
    }
}

exports.getAllConsultant = async (req,res)=>{
    try {
        const savedConsultant = await Consultant.find({});
        if (!savedConsultant) {
        return res.status(404).json({message:'Consultant Not Found',statusCode:404});
        }
        return res.status(200).json({message:'Consultant Fetched Successfully',statusCode:200,data:savedConsultant});

    } catch (error) {
        res.status(500).json({message:error.message,statusCode:500,status:'ERROR'});
    }
}
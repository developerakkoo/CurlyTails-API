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

exports.getAllConsultant = async (req,res)=>{
    try {
        const savedConsultant = await Consultant.find({});
        if (savedConsultant.length == 0) {
        return res.status(404).json({message:'Consultant Not Found',statusCode:404});
        }
        return res.status(200).json({message:'Consultant Fetched Successfully',statusCode:200,length:savedConsultant.length,data:savedConsultant});

    } catch (error) {
        res.status(500).json({message:error.message,statusCode:500,status:'ERROR'});
    }
}

exports.getConsultantById = async (req,res)=>{
    try {
        const savedConsultant = await Consultant.findOne({_id:req.params.consultantId});
        if (!savedConsultant) {
        return res.status(404).json({message:'Consultant Not Found',statusCode:404});
        }
        return res.status(200).json({message:'Consultant Fetched Successfully',statusCode:200,data:savedConsultant});

    } catch (error) {
        res.status(500).json({message:error.message,statusCode:500,status:'ERROR'});
    }
}

exports.updatedConsultant = async (req,res) =>{
    try {

        const savedConsultant = await Consultant.findOne({_id:req.params.consultantId});
        if (!savedConsultant) {
        return res.status(404).json({message:'Consultant Not Found',statusCode:404});
        }
        savedConsultant.Name = req.body.name != undefined
        ? req.body.name
        :savedConsultant.Name

        savedConsultant.expertise = req.body.expertise != undefined
        ? req.body.expertise
        :savedConsultant.expertise

        savedConsultant.description = req.body.description != undefined
        ? req.body.description
        :savedConsultant.description

        savedConsultant.ratings = req.body.ratings != undefined
        ? req.body.ratings
        :savedConsultant.ratings

        savedConsultant.isActive = req.body.isActive != undefined
        ? req.body.isActive
        :savedConsultant.isActive

        savedConsultant.isBlocked = req.body.isBlocked != undefined
        ? req.body.isBlocked
        :savedConsultant.isBlocked

        savedConsultant.isTopConsultant = req.body.isTopConsultant != undefined
        ? req.body.isTopConsultant
        :savedConsultant.isTopConsultant

        const updatedConsultant = await savedConsultant.save()

        res.status(200).json({message:'Consultant Details Updated Successfully',statusCode:200,data:updatedConsultant});
    } catch (error) {
        res.status(500).json({message:error.message,statusCode:500,status:'ERROR'});
    }
}


exports.updateConsultantImage = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({msg: "Please attach a file",statusCode:404});
        }
        const imageUrl = req.protocol +"://"+req.hostname +"/"+req.file.path.replace(/\\/g, "/")
        const savedConsultant = await Consultant.findOne({_id:req.params.consultantId});
        if (!savedConsultant) {
            return res.status(404).json({message: "Consultant Not Found",statusCode:404});
        }
        //Removing Image From Server
        if (savedConsultant.imageUrl) {
            let temp = savedConsultant.imageUrl.split('http')
            let path = temp[1].split('://localhost');
            deleteImage.clearImage(path[1]);
        }

/********************************************************/   
        savedConsultant.imageUrl = imageUrl!= undefined
        ? imageUrl
        :savedConsultant.imageUrl 
        const updatedConsultant  = await savedConsultant.save()         
        res.status(201).json({
                message:"Consultant Image  Updated Successfully",
                statusCode:201,
                data:updatedConsultant
            })
        
    } catch (error) {
        res.status(500).json({message:error.message,statusCode:500,status:'ERROR'});
    }
}


exports.deleteConsultant = async (req, res, next) => {
    try {

        const savedConsultant = await Consultant.findOne({_id:req.params.consultantId});
        if (!savedConsultant) {
            return res.status(404).json({message: "Consultant Not Found",statusCode:404});
        }
        //Removing Image From Server
        let temp = savedConsultant.imageUrl.split('http')
        let path = temp[1].split('://localhost');
        deleteImage.clearImage(path[1]);
/********************************************************/   
        await savedConsultant.deleteOne({_id:req.params.consultantId})         
        res.status(201).json({
                message:"Consultant Deleted Successfully",
                statusCode:200
            })
        
    } catch (error) {
        res.status(500).json({message:error.message,statusCode:500,status:'ERROR'});
    }
}


exports.getTopConsultant = async (req,res)=>{
    try {
        const savedConsultant = await Consultant.find({
            isTopConsultant:true,
            isActive:true
        });
        if (savedConsultant.length == 0) {
        return res.status(404).json({message:'Top Consultant Not Found',statusCode:404});
        }
        return res.status(200).json({message:'Top Consultant Fetched Successfully',statusCode:200,length:savedConsultant.length,data:savedConsultant});

    } catch (error) {
        res.status(500).json({message:error.message,statusCode:500,status:'ERROR'});
    }
}
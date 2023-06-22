const Admin = require('../models/admin.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.postSignup = async (req, res, next) => {
try {
        const adminData = {
        name : req.body.name,
        email: req.body.email,
        phoneNo:req.body.phoneNo,
        password: await bcrypt.hash(req.body.password,16)
        }
        const checkAdmin =  await Admin.findOne({email:req.body.email});
        if(checkAdmin){
        return res.status(400).json({message:`Admin Already Exist with Email ${req.body.email} Please With Different Email `,statusCode:400});
        }
        const createdAdmin = await Admin.create(adminData);
        postRes = {
            adminId:createdAdmin._id,
            name : createdAdmin.name,
            phoneNo:createdAdmin.phoneNo,
            email: createdAdmin.email,
            
        }
        res.status(200).json({message:'Admin Created Successfully',statusCode:200,data:postRes});
    } catch (error) {
        res.status(500).send({message:error.message,statusCode:500,status:'ERROR'});
    }
}

exports.AdminLogin = async (req,res) => {
    try {    
        const email = req.body.email
        const password = req.body.password
        const savedAdmin = await Admin.findOne({email:email});
        if(!savedAdmin){
            return res.status(404).json({message:`Admin Not Found With This Email ${req.body.email}`,statusCode:404})
        }
        if(!(await bcrypt.compare(password, savedAdmin.password))){
            return res.status(401).json({message:`Incorrect Password`,statusCode:401});
        }
        const payload = {
            userId: savedAdmin._id,
            email:  savedAdmin.email 
        }
        const token = await jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '24h'});
        const postRes = {
            Id:savedAdmin._id,
            User : savedAdmin.name,
            accessToken : token
        }
        res.status(200).json({message:`User login successfully`,statusCode:200,data:postRes});
    }catch(error){
        res.status(500).json({status:'ERROR',statusCode:500,Message:error.message});
    }
}

exports.updateAdmin = async (req,res)=>{
    try {
        const savedAdmin = await Admin.findOne({_id:req.params.adminId}).select('-password');
        if (!savedAdmin) {
            return res.status(404).json({message:`Admin  Not Found With ID:${req.params.adminId}`,statusCode:404});
        }
        savedAdmin.name = req.body.name != undefined
        ?req.body.name
        :savedAdmin.name
        savedAdmin.phoneNo = req.body.phoneNo != undefined
        ?req.body.phoneNo
        :savedAdmin.phoneNo
        savedAdmin.email = req.body.email != undefined
        ?req.body.email
        :savedAdmin.email
        
        const updatedAdmin = await savedAdmin.save();
        res.status(201).json({message:'Admin Updated Successfully',statusCode:201,data:updatedAdmin});
    } catch (error) {
        res.status(500).json({message:error.message,statusCode:500,status:'ERROR'});
    }
}

exports.getAdminById = async (req,res)=>{
    try {
        const savedAdmin = await Admin.findOne({_id:req.params.adminId}).select('-password');
        if (!savedAdmin) {
            return res.status(404).json({message:`Admin  Not Found With ID:${req.params.adminId}`,statusCode:404});
        }        

        res.status(200).json({message:'Admin Fetched Successfully',statusCode:200,data:savedAdmin});
    } catch (error) {
        res.status(500).json({message:error.message,statusCode:500,status:'ERROR'});
    }
}


exports.getAllAdmin = async(req,res) =>{
    try {
        const savedAdmin = await Admin.find().select('-password');
        if (savedAdmin.length == 0) {
            return res.status(404).json({message:`Admin Not Found`,statusCode:404});
        }
        res.status(200).json({message:'Admin Fetched Successfully',statusCode:200,length: savedAdmin.length,data:savedAdmin});
    } catch (error) {
        res.status(500).json({message:error.message,statusCode:500,status:'ERROR'});
    }
}


exports.deleteAdmin = async (req,res)=>{
    try {
        const savedAdmin = await Admin.findOne({_id:req.params.adminId});
        if (!savedAdmin) {
            return res.status(404).json({message:`Admin  Not Found With ID:${req.params.adminId}`,statusCode:404});
        }        
        await savedAdmin.deleteOne({_id:req.params.adminId})
        res.status(200).json({message:'Admin Deleted Successfully',statusCode:200});
    } catch (error) {
        res.status(500).json({message:error.message,statusCode:500,status:'ERROR'});
    }
}


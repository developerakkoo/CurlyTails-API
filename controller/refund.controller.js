const Refund = require('../models/refund.model');
const {status} = require('../utils/refundStatus');


exports.postRefund = async (req,res)=>{
    try {
        const refundObj ={
            userId:req.body.userId,
            orderId:req.body.OrderId,
            description:req.body.description
        }
        const createdRefund = await Refund.create(refundObj);
        res.status(200).json({message:'Refund Request Created',statusCode:200,data:createdRefund});
    } catch (error) {
        res.status(500).json({message:error.message,statusCode:500,status:'ERROR'});
    }
}

exports.getAllRefundRequest = async(req,res) =>{
    try {
        const savedRefund = await Refund.find({});
        if (savedRefund.length == 0) {
            return res.status(404).json({message:`Refund Requests Not Found`,statusCode:404});
        }
        res.status(200).json({message:'Refund Request Fetched Successfully',statusCode:200,length:savedRefund.length,data:savedRefund});
    } catch (error) {
        res.status(400).json({message:error.message,statusCode:500,status:'ERROR'});
    }
}

exports.getRefundRequestById = async(req,res) =>{
    try {
        const savedRefund = await Refund.findOne({_id:req.params.refundId});
        if (!savedRefund) {
            return res.status(404).json({message:`Refund Request Not Found`,statusCode:404});
        }
        res.status(200).json({message:'Refund Request Fetched Successfully',statusCode:200,data:savedRefund});
    } catch (error) {
        res.status(400).json({message:error.message,statusCode:500,status:'ERROR'});
    }
}

exports.updateRefundRequestStatus = async(req,res) =>{
    try {
        const savedRefund = await Refund.findOne({_id:req.params.refundId});
        let  UpdatedStatus 
        if (!savedRefund) {
            return res.status(404).json({message:`Refund Request Not Found`,statusCode:404});
        }
        if(req.body.status == 'REFUND_INITIATED'){
            savedRefund.refundStatus = status.Accept != undefined
            ? status.Accept
            : savedRefund.refundStatus = status.Accept
            UpdatedStatus = await savedRefund.save()
            return res.status(200).json({message:'Refund Request Status Updated Successfully',statusCode:200,data:UpdatedStatus});
        }

        else if(req.body.status == 'ACCEPTED'){
            savedRefund.refundStatus = status.Refund != undefined
            ? status.Refund
            : savedRefund.refundStatus = status.Refund
            UpdatedStatus = await savedRefund.save();
            return res.status(200).json({message:'Refund Request Status Updated Successfully',statusCode:200,data:UpdatedStatus});
        }

        if(req.body.status == 'REJECTED'){
            savedRefund.refundStatus = status.Reject != undefined
            ? status.Reject
            : savedRefund.refundStatus = status.Reject
            UpdatedStatus = await savedRefund.save();
            return res.status(200).json({message:'Refund Request Status Updated Successfully',statusCode:200,data:UpdatedStatus});
        }
        
        
    } catch (error) {
        res.status(500).json({message:error.message,statusCode:500,status:'ERROR'});
    }
}

exports.deleteRefundRequest = async(req,res) =>{
    try {
        const savedRefund = await Refund.findOne({_id:req.params.refundId});
        if (!savedRefund) {
            return res.status(404).json({message:`Refund Request Not Found`,statusCode:404});
        }await savedRefund.deleteOne({_id:req.params.refundId});
        res.status(200).json({message:'Refund Request Deleted Successfully',statusCode:200});
    } catch (error) {
        res.status(400).json({message:error.message,statusCode:500,status:'ERROR'});
    }
}
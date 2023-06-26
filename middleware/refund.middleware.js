exports.validateRefund = async (req,res,next)=>{
    const refundObj ={
        userId:req.body.userId,
        orderId:req.body.OrderId,
        description:req.body.description
    }
    if (!refundObj.userId) {
        return res.status(400).json({message:'UserId Is Require',statusCode:400});
    } 
    else if (!refundObj.orderId) {
        return res.status(400).json({message:'orderId Is Require',statusCode:400});
    } 
    else if (!refundObj.description) {
        return res.status(400).json({message:'Description Is Require',statusCode:400});
    } 
    else {
        next();
    }
}
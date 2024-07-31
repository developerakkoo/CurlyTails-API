exports.validatePharmacy = async (req,res,next) =>{
    const dataObj = {
        BrandName : req.body.BrandName,
        medicineName : req.body.medicineName,
        description :req.body.description,
        price:req.body.price
    }
    if (!dataObj.BrandName) {
        return res.status(400).json({message:'Brand Name Is Require'});
    }
    else if (!dataObj.medicineName) {
        return res.status(400).json({message:'medicine Name Is Require'});
    }
    else if (!dataObj.description) {
        return res.status(400).json({message:'description Is Require'});
    }
    else if (!dataObj.price) {
        return res.status(400).json({message:'price Is Require'});
    }
    else {
        next()
    }
}
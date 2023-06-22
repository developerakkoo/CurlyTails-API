exports.validateConsultant  = async(req,res,next) =>{
    const dataObj = {
        dataObj:req.body.name,
        expertise:req.body.expertise,
        description:req.body.description,
    }
    if (!dataObj.dataObj) {
        return res.status(400).json({message:'Name Is Require'});
    }
    else if (!dataObj.expertise) {
        return res.status(400).json({message:'Expertise Is Require'});
    }
    else if (!dataObj.description) {
        return res.status(400).json({message:'Description Is Require'});
    }
    else {
        next()
    }
}
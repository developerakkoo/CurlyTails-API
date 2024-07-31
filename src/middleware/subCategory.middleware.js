exports.validatePostSubCategory = (req,res,next)=>{
    const dataObj={
        CategoryId:req.body.CategoryId,
        name:req.body.name,
        description:req.body.description
    }
    if (!dataObj.CategoryId) {
        return res.status(400).json({message:"CategoryId  Is Require"});
    }
    else if (!dataObj.name) {
        return res.status(400).json({message:"subCategory Name Is Require"});
    }
    else if (!dataObj.description) {
        return res.status(400).json({message:"subCategory Description Is Require"});
    }
    else{
        next();
    }
}
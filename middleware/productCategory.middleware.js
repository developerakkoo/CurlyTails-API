exports.validatePostProductCategory = (req,res,next)=>{
    const dataObj={
        CategoryId:req.body.CategoryId,
        subCategoryId:req.body.subCategoryId,
        name:req.body.name,
        description:req.body.description
    }
    if (!dataObj.CategoryId) {
        return res.status(400).json({message:"CategoryId  Is Require"});
    }
    else if (!dataObj.name) {
        return res.status(400).json({message:"subCategoryId Is Require"});
    }
    else if (!dataObj.name) {
        return res.status(400).json({message:"ProductCategory Name Is Require"});
    }
    else if (!dataObj.description) {
        return res.status(400).json({message:"ProductCategory Description Is Require"});
    }
    else{
        next();
    }
}
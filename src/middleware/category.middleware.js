exports.validatePostCategory = (req,res,next)=>{
    const dataObj={
        name:req.body.name,
        description:req.body.description
    }
    if (!dataObj.name) {
        return res.status(400).json({message:"Category Name Is Require"});
    }
    else if (!dataObj.description) {
        return res.status(400).json({message:"Category Description Is Require"});
    }
    else{
        next();
    }
}
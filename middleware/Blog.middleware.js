exports.validateBlog = async(req,res,next) =>{
    const blogObj = {
        Title:req.body.title,
        description:req.body.description,
        imageUrl:req.file
    } 
    if (!blogObj.Title) {
        return res.status(400).json({message:'Title Is Require'});
    }
    else if (!blogObj.description) {
        return res.status(400).json({message:'Description Is Require'});
    }
    else if (!blogObj.imageUrl) {
        return res.status(400).json({message:'image Is Require'});
    }
    else {
        next()
    }
}
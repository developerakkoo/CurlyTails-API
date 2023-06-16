exports.validateProduct = async(req,res,next) => {
    try {
        const productObj ={
            CategoryId:req.body.CategoryId,
            subCategoryId:req.body.subCategoryId,
            productCategoryId:req.body.productCategoryId,
            name:req.body.name,
            description:req.body.description,
            size:req.body.size,
            price:req.body.price,
            brand:req.body.brand,
            LifeStage:req.body.LifeStage,
            BreedSize:req.body.BreedSize,
            flavor:req.body.flavor,
            vegNonVeg:req.body.vegNonVeg,
        }
        if(!productObj.CategoryId){
        return res.status(400).json({message:'CategoryId Is Require'}) 
        }
        if(!productObj.subCategoryId){
        return res.status(400).json({message:'SubCategoryId Is Require'}) 
        }
        if(!productObj.productCategoryId){
        return res.status(400).json({message:'ProductCategoryId Is Require'}) 
        }
        if(!productObj.name){
        return res.status(400).json({message:'Name Is Require'}) 
        }
        if(!productObj.description){
        return res.status(400).json({message:'Description Is Require'}) 
        }
        if(!productObj.size){
        return res.status(400).json({message:'Size Is Require'}) 
        }
        if(!productObj.price){
        return res.status(400).json({message:'Price Is Require'}) 
        }

        if(!productObj.brand){
        return res.status(400).json({message:'Brand Is Require'}) 
        }
        if(!productObj.LifeStage){
        return res.status(400).json({message:'LifeStage Is Require'}) 
        }
        if(!productObj.BreedSize){
        return res.status(400).json({message:'BreedSize Is Require'}) 
        }
        if(!productObj.flavor){
        return res.status(400).json({message:'Flavor Is Require'}) 
        }
        if(!productObj.vegNonVeg){
        return res.status(400).json({message:'Veg/Non-Veg Filed Is Require'}) 
        }
        next();
    } catch (error) {
        res.status(500).json({message:error.message,status:'ERROR'});
    }
}
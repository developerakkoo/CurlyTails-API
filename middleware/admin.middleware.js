exports.validateAdmin = async(req,res,next) =>{
    const AdminData = {
        email: req.body.email,
        }
    if (!AdminData.email) {
        return res.status(400).json({message:'Email Is Require'});
    }
    else if (!AdminData.password) {
        return res.status(400).json({message:'Password Is Require'});
    }
    else {
        next()
    }
}
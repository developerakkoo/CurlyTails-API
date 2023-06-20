exports.validateAdmin = async(req,res,next) =>{
    const AdminData = {
        name : req.body.name,
        email: req.body.email,
        phoneNo:req.body.phoneNo,
        password: req.body.password,
        }
    if (!AdminData.name) {
        return res.status(400).json({message:'Name Is Require'});
    }
    else if (!AdminData.email) {
        return res.status(400).json({message:'Email Is Require'});
    }
    else if (!AdminData.phoneNo) {
        return res.status(400).json({message:'Phone Number Is Require'});
    }
    else if (!AdminData.password) {
        return res.status(400).json({message:'Password Is Require'});
    }
    else {
        next()
    }
}
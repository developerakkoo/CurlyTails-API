exports.validateUser = async(req,res,next) =>{
    const userData = {
        name : req.body.name,
        email: req.body.email,
        phoneNo:req.body.phoneNo,
        password: req.body.password,
        address:req.body.address
        }
    if (!userData.name) {
        return res.status(400).json({message:'Name Is Require'});
    }
    else if (!userData.email) {
        return res.status(400).json({message:'Email Is Require'});
    }
    else if (!userData.phoneNo) {
        return res.status(400).json({message:'Phone Number Is Require'});
    }
    else if (!userData.password) {
        return res.status(400).json({message:'Password Is Require'});
    }
    else if (!userData.address) {
        return res.status(400).json({message:'Address Is Require'});
    }
    else {
        next()
    }
}
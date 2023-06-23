require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;

const verifySid = process.env.TWILIO_VERIFY_SID;
const client = require('twilio')(accountSid,'edbbe84cd5c2c75be66701dd09c42ece');


const User = require('../models/user.model');
const Admin = require('../models/admin.model');

    exports.getToken = async(req, res, next) => {
        const phonenumber = req.body.phonenumber;
        console.log("PHONE:- "+ phonenumber);
        client.verify.v2.services(verifySid)
        .verifications
        .create({
            to:"+91"+phonenumber,
            channel: 'sms'
        }).then((success) => {
        
            res.status(200).json({
                statusCode:'200',
                status: 'success',
                success: success,
            })
        }).catch((error) => {
            res.status(500).json({
                statusCode:'500',
                status: 'error',
                error: error,
                message: 'Something went wrong!'
            })
        })
    }
    
    
    // {lat:DataTransfer,
    // lng:dat}
    
    exports.verifyUserToken = async(req, res, next) => {
    
        const code = req.body.code;
        const phonenumber = req.body.phonenumber;
        const user = await User.findOne({phoneNo:phonenumber})
        if(!user){
            return res.status(404).json({message: 'user not register !',statusCode:'404'})
        }
        const userID = user._id
        
        client.verify.v2.services(verifySid)
        .verificationChecks
        .create({
            
                to: "+91"+phonenumber,
                code: code
            
        }).then((success) => {
            const data ={
                UserID:userID,
                phoneNumber:success.to,
                status:success.status,
                Valid:success.valid
            }
            if (success.valid === true && success.status === "approved" ) {
            return res.status(200).json({statusCode:'200',data});   
            }
            res.status(400).json({statusCode:'400',message:`Please Enter Valid Otp Or Mobile Number`})
            
        }).catch((error) => {
            res.status(500).json({status:'error' ,statusCode:'500', message: error.message})
        })
    }


    exports.verifyAdminToken = async(req, res, next) => {
    
        const code = req.body.code;
        const phonenumber = req.body.phonenumber;
        const user = await Admin.findOne({phoneNo:phonenumber})
        if(!user){
            return res.status(404).json({message: 'user not register !',statusCode:'404'})
        }
        const userID = user._id
        
        client.verify.v2.services(verifySid)
        .verificationChecks
        .create({
            
                to: "+91"+phonenumber,
                code: code
            
        }).then((success) => {
            const data ={
                UserID:userID,
                UserType:'Admin',
                phoneNumber:success.to,
                status:success.status,
                Valid:success.valid
            }
            if (success.valid === true && success.status === "approved" ) {
            return res.status(200).json({statusCode:'200',data});   
            }
            res.status(400).json({statusCode:'400',message:`Please Enter Valid Otp Or Mobile Number`})
            
        }).catch((error) => {
            res.status(500).json({status:'error' ,statusCode:'500', message: error.message})
        })
    }
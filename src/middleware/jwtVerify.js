const jwt = require('jsonwebtoken');
require('dotenv').config();


const verifyToken = (req, res, next) => {
    console.log("token>",req.headers['x-access-token']);
    let token = req.headers['x-access-token']
    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        })
    }
    jwt.verify(token, process.env.SECRET_KEY ,
        (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    message: "Unauthorized!"
                })
            }
            console.log("jwt>>>")
            req.userId = decoded.userId
            next()
        })
    }


    module.exports ={
        verifyToken
    }
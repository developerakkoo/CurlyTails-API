const express = require("express");
const routes = express.Router();
const OTP = require("../controller/otpVerify");

routes.post("/App/verifyUser/sendOtp", OTP.getToken);

routes.post("/App/User/verify", OTP.verifyUserToken);

routes.post("/App/admin/verify", OTP.verifyAdminToken);

module.exports = { verifyRoute: routes };

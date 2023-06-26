const express = require('express');
const route = express.Router();
const refundController = require('../controller/refund.controller');
const {validateRefund} = require('../middleware/refund.middleware');


route.post('/post/refund',validateRefund,refundController.postRefund);

route.get('/get/refund/:refundId',refundController.getRefundRequestById);

route.get('/getAll/refund',refundController.getAllRefundRequest);

route.put('/update/refund-status/:refundId',refundController.updateRefundRequestStatus);

route.delete('/delete/refund/:refundId',refundController.deleteRefundRequest);


module.exports={RefundRoutes : route}
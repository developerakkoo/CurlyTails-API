const route = require('express').Router();
const notificationController = require('../controller/notification.controller');

route.post('/post/notification',notificationController.postNotification);

route.get('/get/notification/:Id',notificationController.getNotificationById);

route.get('/getAll/notification',notificationController.getAllNotification);

// route.put('/update/refund-status/:Id',notificationController.updateRefundRequestStatus);

route.delete('/delete/notification/:Id',notificationController.deleteNotification);




module.exports={NotificationRoutes : route}
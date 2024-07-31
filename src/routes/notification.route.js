const route = require("express").Router();
const notificationController = require("../controller/notification.controller");

route.post("/post", notificationController.postNotification);

route.get("/get/:Id", notificationController.getNotificationById);

route.get("/getAll", notificationController.getAllNotification);

// route.put('/update/refund-status/:Id',notificationController.updateRefundRequestStatus);

route.delete("/delete/:Id", notificationController.deleteNotification);

module.exports = { NotificationRoutes: route };

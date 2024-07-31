const Notification = require("../models/notification.model");
const { getIO } = require("../socket");

exports.postNotification = async (req, res) => {
  try {
    const dataObj = {
      userId: req.body.userId,
      message: req.body.message,
    };
    const createdNotification = await Notification.create(dataObj);
    getIO.emit("notification", { data: createdNotification });
    res.status(201).json({
      message: "Notification Created Successfully",
      statusCode: 201,
      data: createdNotification,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message, statusCode: 500, status: "ERROR" });
  }
};

exports.getNotificationById = async (req, res) => {
  try {
    const savedNotification = await Notification.findOne({
      _id: req.params.Id,
    });
    if (!savedNotification) {
      return res.status(404).json({
        message: `Notification Not Found With Id:${req.params.Id}`,
        statusCode: 404,
      });
    }
    getIO.emit("notification:get", { data: savedNotification });
    res.status(200).json({
      message: "Notification Fetched Successfully",
      statusCode: 200,
      data: savedNotification,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message, statusCode: 500, status: "ERROR" });
  }
};

exports.getAllNotification = async (req, res) => {
  try {
    const savedNotification = await Notification.find();
    if (savedNotification.length == 0) {
      return res
        .status(404)
        .json({ message: "Notifications Not Found", statusCode: 404 });
    }
    res.status(200).json({
      message: "Notifications Fetched Successfully",
      statusCode: 200,
      length: savedNotification.length,
      data: savedNotification,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message, statusCode: 500, Status: "ERROR" });
  }
};

exports.deleteNotification = async (req, res) => {
  try {
    const savedNotification = await Notification.findOne({
      _id: req.params.Id,
    });
    if (!savedNotification) {
      return res.status(404).json({
        message: `Notification Not Found With Id:${req.params.Id}`,
        statusCode: 404,
      });
    }
    await savedProduct.deleteOne({ _id: req.params.Id });
    getIO.emit("notification:delete", { data: req.params.Id });
    res.status(200).json({
      message: "Notification Delete Successfully",
      statusCode: 200,
      data: savedNotification,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message, statusCode: 500, status: "ERROR" });
  }
};

const Blog = require("../models/Blog.model");
const deleteImage = require("../utils/deleteFile");

exports.postBlog = async (req, res) => {
  try {
    const blogObj = {
      Title: req.body.title,
      description: req.body.description,
      imageUrl:
        req.protocol +
        "://" +
        req.hostname +
        "/" +
        req.file.path.replace(/\\/g, "/"),
    };
    const createdBlog = await Blog.create(blogObj);
    res.status(201).json({
      message: "Blog Created Successfully",
      statusCode: 201,
      data: createdBlog,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message, statusCode: 500, status: "ERROR" });
  }
};

exports.updateBlogImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ msg: "Please attach a file", statusCode: 404 });
    }
    const imageUrl =
      req.protocol +
      "://" +
      req.hostname +
      "/" +
      req.file.path.replace(/\\/g, "/");
    const savedBlog = await Blog.findOne({ _id: req.params.blogId });
    if (!savedBlog) {
      return res.status(404).json({ msg: "Blog Not Found", statusCode: 404 });
    }
    //Removing Image From Server
    let temp = savedBlog.imageUrl.split("http");
    let path = temp[1].split("://localhost");
    deleteImage.clearImage(path[1]);
    /********************************************************/
    savedBlog.imageUrl = imageUrl != undefined ? imageUrl : savedBlog.imageUrl;
    const updatedBlog = await savedBlog.save();
    res.status(201).json({
      message: "Blog Updated Successfully",
      statusCode: 201,
      data: updatedBlog,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message, statusCode: 500, status: "ERROR" });
  }
};

exports.updateBlog = async (req, res, next) => {
  try {
    const savedBlog = await Blog.findOne({ _id: req.params.blogId });
    if (!savedBlog) {
      return res.status(404).json({ msg: "Blog Not Found", statusCode: 404 });
    }
    savedBlog.Title =
      req.body.title != undefined ? req.body.title : savedBlog.Title;

    savedBlog.description =
      req.body.description != undefined
        ? req.body.description
        : savedBlog.description;

    savedBlog.isTopBlog =
      req.body.isTopBlog != undefined
        ? req.body.isTopBlog
        : savedBlog.isTopBlog;

    const updatedBlog = await savedBlog.save();
    res.status(201).json({
      message: "Blog Updated Successfully",
      statusCode: 201,
      data: updatedBlog,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message, statusCode: 500, status: "ERROR" });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const savedBlog = await Blog.find({});
    if (savedBlog.length == 0) {
      return res.status(404).json({ msg: "Blog Not Found", statusCode: 404 });
    }
    res.status(200).json({
      message: "Blog Fetched Successfully",
      statusCode: 200,
      length: savedBlog.length,
      data: savedBlog,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message, statusCode: 500, status: "ERROR" });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const savedBlog = await Blog.findOne({ _id: req.params.blogId });
    if (!savedBlog) {
      return res.status(404).json({ msg: "Blog Not Found", statusCode: 404 });
    }
    res.status(200).json({
      message: "Blog Fetched Successfully",
      statusCode: 200,
      data: savedBlog,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message, statusCode: 500, status: "ERROR" });
  }
};

exports.deleteBlog = async (req, res, next) => {
  try {
    const savedBlog = await Blog.findOne({ _id: req.params.blogId });
    if (!savedBlog) {
      return res.status(404).json({ msg: "Blog Not Found", statusCode: 404 });
    }
    //Removing Image From Server
    let temp = savedBlog.imageUrl.split("http");
    let path = temp[1].split("://localhost");
    deleteImage.clearImage(path[1]);
    /********************************************************/
    await savedBlog.deleteOne({ _id: req.params.blogId });
    res.status(201).json({
      message: "Blog Deleted Successfully",
      statusCode: 200,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message, statusCode: 500, status: "ERROR" });
  }
};

exports.getTopBlogs = async (req, res) => {
  try {
    const savedBlog = await Blog.find({ isTopBlog: true });
    if (savedBlog.length == 0) {
      return res
        .status(404)
        .json({ msg: "Top Blog Not Found", statusCode: 404 });
    }
    res.status(200).json({
      message: "Top Blog Fetched Successfully",
      statusCode: 200,
      length: savedBlog.length,
      data: savedBlog,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message, statusCode: 500, status: "ERROR" });
  }
};

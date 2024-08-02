const Category = require("../models/category.model");

exports.addCategory = async (req, res) => {
  try {
    console.log('====================================');
    console.log(req.body);
    console.log('====================================');
    const { filename } = req.file;
    let localPath =`public/${filename}`;
    let image_url = `https://${req.hostname}/public/${filename}`;
    if (process.env.NODE_ENV !== "production") {
        image_url = `https://${req.hostname}:8000/public/${filename}`;
    }
    const dataObj = {
      image:image_url,
      localPath:localPath,
      name: req.body.name,
      description: req.body.description,
    };

    const savedCategory = await Category.findOne({ name: req.body.name });
    if (savedCategory) {
      return res
        .status(406)
        .json({
          message: `Category Already Exist with Name:${req.body.name}, Please Try With Different Name `,
          statusCode: 406,
        });
    }
    const createdCategory = await Category.create(dataObj);
    res
      .status(201)
      .json({
        message: "Category Created Successfully!",
        statusCode: 201,
        data: createdCategory,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message, statusCode: 500, status: "ERROR" });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const savedCategory = await Category.findOne({
      _id: req.params.categoryId,
    });
    if (!savedCategory) {
      return res
        .status(404)
        .json({
          message: `Category Not Found With This Id:${req.params.categoryId}`,
          statusCode: 404,
        });
    }
    savedCategory.name =
      req.body.name != undefined ? req.body.name : savedCategory.name;
    savedCategory.description =
      req.body.description != undefined
        ? req.body.description
        : savedCategory.description;
    savedCategory.isTopCategory =
      req.body.isTopCategory != undefined
        ? req.body.isTopCategory
        : savedCategory.isTopCategory;

    const updatedCategory = await savedCategory.save();
    res
      .status(200)
      .json({
        message: "Category Updated Successfully",
        statusCode: 200,
        data: updatedCategory,
      });
  } catch (error) {
    console.log(error);
    if (error.code == 11000) {
      return res
        .status(406)
        .json({
          message: `Category Already Exist with Name:${req.body.name}, Please Try With Different Name`,
          statusCode: 406,
        });
    }
    res
      .status(500)
      .json({ message: error.message, statusCode: 500, status: "ERROR" });
  }
};

exports.getAllCategory = async (req, res) => {
  try {
    const savedCategory = await Category.find();
    if (savedCategory.length == 0) {
      return res
        .status(404)
        .json({ message: "Category Not found", statusCode: 404 });
    }
    res
      .status(200)
      .json({
        message: "Category Fetched Successfully",
        statusCode: 200,
        length: savedCategory.length,
        data: savedCategory,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message, statusCode: 500, status: "ERROR" });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const savedCategory = await Category.findOne({
      _id: req.params.categoryId,
    });
    if (!savedCategory) {
      return res
        .status(404)
        .json({ message: "Category Not found", statusCode: 404 });
    }
    res
      .status(200)
      .json({ message: "Category Fetched Successfully", data: savedCategory });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message, statusCode: 500, status: "ERROR" });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const savedCategory = await Category.findOne({
      _id: req.params.categoryId,
    });
    if (!savedCategory) {
      return res
        .status(404)
        .json({ message: "Category Not found", statusCode: 404 });
    }
    await savedCategory.deleteOne({ _id: req.params.categoryId });
    res
      .status(200)
      .json({ message: "Category Deleted Successfully", statusCode: 200 });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message, statusCode: 500, status: "ERROR" });
  }
};

exports.getTopCategory = async (req, res) => {
  try {
    const savedCategory = await Category.find({ isTopCategory: true });
    if (savedCategory.length == 0) {
      return res
        .status(404)
        .json({ message: "Top Category Not found", statusCode: 404 });
    }
    res
      .status(200)
      .json({
        message: "Top Category Fetched Successfully",
        data: savedCategory,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message, statusCode: 500, status: "ERROR" });
  }
};

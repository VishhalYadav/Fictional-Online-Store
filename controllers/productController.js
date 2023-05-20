const Product = require("../models/productModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.searchProducts = catchAsync(async (req, res, next) => {
  let queryObj = {};

  // search products by name,description and category.
  if (req.query.name) {
    queryObj.name = req.query.name;
  }
  if (req.query.description) {
    queryObj.description = req.query.description;
  }
  if (req.query.category) {
    queryObj.category = req.query.category;
  }

  let query = Product.find(queryObj);

  // Pagination
  if (req.query.page) {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    const numProducts = await Product.countDocuments();
    if (skip >= numProducts)
      return next(new AppError("This page does not exist", 404));
  }

  const products = await query;

  res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      products,
    },
  });
});

exports.createProduct = catchAsync(async (req, res, next) => {
  const newProduct = await Product.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      product: newProduct,
    },
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError("No product found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return next(new AppError("No product found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return next(new AppError("No product found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

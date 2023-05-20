const Order = require("../models/orderModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllOrders = catchAsync(async (req, res, next) => {
  let query = Order.find({});
  if (req.query.page) {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    const numProducts = await Order.countDocuments();
    if (skip >= numProducts)
      return next(new AppError("This page does not exist", 404));
  }

  const orders = await query;
  if (!orders || orders.length === 0) {
    return next(new AppError("No orders found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      orders,
    },
  });
});

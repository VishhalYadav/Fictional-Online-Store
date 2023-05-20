const User = require("./../models/userModel");
const Product = require("./../models/productModel");
const Order = require("../models/orderModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.addToCart = catchAsync(async (req, res, next) => {
  const { userId, productId, quantity } = req.body;

  // Check if the user exists
  const user = await User.findById(userId);
  if (!user) {
    return next(new AppError("User not found", 404));
  }

  // Check if the product exists
  const product = await Product.findById(productId);
  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  // Add the product to the user's shopping cart
  user.shoppingCart.push({
    product: productId,
    quantity: quantity || 1,
  });

  // Save the user document
  await user.save();

  res.status(200).json({
    status: "success",
    message: "Product added to cart successfully",
  });
});

exports.addMultipleProductsToCart = catchAsync(async (req, res, next) => {
  const { userId, products } = req.body;

  // Check if the user exists
  const user = await User.findById(userId);
  if (!user) {
    return next(new AppError("User not found", 404));
  }

  // Retrieve the product details from the database
  const productIds = products.map((item) => item.productId);
  const fetchedProducts = await Product.find({ _id: { $in: productIds } });

  // Add products to the user's shopping cart
  for (const item of products) {
    const { productId, quantity } = item;
    const product = fetchedProducts.find(
      (p) => p._id.toString() === productId.toString()
    );
    if (!product) {
      return next(new AppError(`Product not found: ${productId}`, 404));
    }
    user.shoppingCart.push({ product: product._id, quantity });
  }

  // Save the updated user document
  await user.save();

  res.status(200).json({
    status: "success",
    message: "Products added to cart successfully",
    data: {
      user,
    },
  });
});

exports.placeOrder = catchAsync(async (req, res, next) => {
  const { userId, shippingAddress, paymentMethod } = req.body;

  // Check if the user exists
  const user = await User.findById(userId);
  if (!user) {
    return next(new AppError("User not found", 404));
  }

  // Retrieve the products from the user's shopping cart
  const cartProducts = user.shoppingCart.map((item) => item.product);

  // Retrieve the product details from the database
  const products = await Product.find({ _id: { $in: cartProducts } });

  // Calculate the total price
  let totalPrice = 0;
  for (let i = 0; i < user.shoppingCart.length; i++) {
    const cartItem = user.shoppingCart[i];
    const product = products.find(
      (p) => p._id.toString() === cartItem.product.toString()
    );
    if (product) {
      totalPrice += product.price * cartItem.quantity;
    }
  }

  totalPrice = Number(totalPrice.toFixed(2));

  // Create the order
  const order = new Order({
    user: userId,
    products: user.shoppingCart,
    totalPrice,
    shippingAddress,
    paymentMethod,
  });

  // Save the order
  await order.save();

  // Update the user's orders array
  user.orders.push(order._id);
  await user.save();

  // Clear the user's shopping cart
  user.shoppingCart = [];
  await user.save();

  res.status(201).json({
    status: "success",
    data: {
      order,
    },
  });
});

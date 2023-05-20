const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.use(authController.protect);

router.post("/cart", userController.addToCart);
router.post(
  "/multiple-products-cart",
  userController.addMultipleProductsToCart
);
router.post("/place-order", userController.placeOrder);

module.exports = router;

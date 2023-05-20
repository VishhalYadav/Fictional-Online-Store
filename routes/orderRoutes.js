const express = require("express");
const orderController = require("./../controllers/orderController");
const authController = require("./../controllers/authController");

const router = express.Router();
router.use(authController.protect);

router.get("/", orderController.getAllOrders);

module.exports = router;

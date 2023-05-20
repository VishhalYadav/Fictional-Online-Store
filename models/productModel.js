const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    maxLength: 100,
    required: [true, "A product must have a name"],
    unique: true,
  },
  description: {
    type: String,
    maxLength: 500,
    required: [true, "A product must have a description"],
  },
  category: {
    type: String,
    enum: ["Electronics", "Clothing", "Home", "Beauty", "Other"],
    required: [true, "A product must have a category"],
  },
  price: {
    type: Number,
    minimum: 0,
    required: [true, "A product must have a price"],
  },
  image: {
    type: String,
    format: "uri",
  },
});
const Product = mongoose.model("Product", productSchema);

module.exports = Product;

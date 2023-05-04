const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  thumbnail: String,
  description: String,
  category: String,
});

const Product = mongoose.model("Product", productSchema);


module.exports = Product;

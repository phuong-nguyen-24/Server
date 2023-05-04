const express = require("express");
const Product = require("../models/Product");
const createError = require('http-errors')

const router = express.Router();

// Get all products
// Method: GET
// Path: /products
router.get("/", async (req, res) => {
  // Find all documents from "products" collection
  const products = await Product.find();

  // Response to client
  res.json(products);
});

// Search product
// Method: GET
// Path: /products/search
router.get("/search", async (req, res) => {
  // Get query q from request
  const q = req.query.q; // Mobile
  console.log(q);

  // Check if q exists or not, if not return []
  if (!q) {
    return res.json([]);
  }

  // Get documents based on q
  // Find all titles contains "laptop" (q)
  const products = await Product.find({
    title: new RegExp(q, "i"), // insensitive
  });

  // Cach 2: title: { $regex: q, $options: "i" }

  // Response to client
  res.json(products);
});

// Get a product by id
// Method: GET
// Path: /products/:productId
router.get("/:productId", async (req, res, next) => {
  try {
    // Get productId from request
    const productId = req.params.productId;

    // Find document from "products" collection by id
    const product = await Product.findById(productId);

    // Response to client
    res.json(product);
  } catch (err) {
    next(new Error("Product not found!"));
  }
});

// Add a product
// Method: POST
// Path: /products/add
router.post("/add", async (req, res) => {
  try {
    // Get body from request
    const newProduct = req.body;

    // Insert into "products" collection
    const product = await Product.create(newProduct);

    // Response to client
    res.json(product);
  } catch (err) {
    res.json({ error: err.message });
  }
});

// Update a product
// Method: PUT
// Path: /products/:productId
router.put("/:productId", async (req, res) => {
  // Get productId from request
  const productId = req.params.productId;

  // Get body (updateProduct) from request
  const updateProduct = req.body;

  // Update document based on productId and updateProduct
  const product = await Product.findByIdAndUpdate(productId, updateProduct, {
    new: true,
  });

  // Response to client
  res.json(product);
});

// Delete a product by Id
// Method: DELETE
// Path: /products/:productId
router.delete("/:productId", async (req, res) => {
  // Get productId from request
  const productId = req.params.productId;

  // Delete document based on productId
  const product = await Product.findByIdAndDelete(productId);

  // Response to client
  res.json(product);
});

module.exports = router;
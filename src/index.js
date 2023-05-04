const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const verify = require("./middlewares/verify");
const productRouter = require("./routes/product.route");
const userRouter = require("./routes/user.route");
const authRouter = require("./routes/auth.route");
const errorHandler = require("./routes/errorHandler");




dotenv.config()

// Create a server
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Database connected!");
});

// Listen incoming requests
app.listen(4000, () => {
  console.log("Server is running...");
});

// CORS
app.use(cors());

// Body parsing
app.use(express.json());

// Custom middleware
// app.use((req, res, next) => {
//   console.log("Authenticate user");
//   next();
// });
app.use(authRouter);
app.use("/product", productRouter);
app.use("/users", userRouter);

// Handle requests
// Method: GET
// Path: /
app.get("/", verify, (req, res) => {
  res.json({ message: "Hello!" });
});

// Error handler
app.use(errorHandler);
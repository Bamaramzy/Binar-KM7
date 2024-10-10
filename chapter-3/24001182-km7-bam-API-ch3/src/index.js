require("dotenv").config();
const express = require("express");
require("express-async-errors");
const fileUpload = require("express-fileupload"); // Ensure this is imported
const carRoutes = require("./routes/cars");
const { errorHandler, notFoundURLHandler } = require("./midllewares/errors");
const { process_params } = require("express/lib/router");

const app = express();
const port = process.env.PORT || 4000;

// Middleware to parse JSON requests
app.use(express.json());

// Middleware for file uploads
app.use(
  fileUpload({
    limits: {
      fileSize: 50 * 1024 * 1024, // 50 MB limit
    },
  })
);

// Use car routes
app.use("/cars", carRoutes);

// Default route
app.get("/", (req, res) => {
  res.json({ message: "ping successfully" });
});

// 404 handling
app.use("*", notFoundURLHandler);

// Error handling middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`The express.js app is running on port ${port}`);
});

// Error handling middleware
exports.errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";

  // Handle zod validation errors
  if (err.errors && Array.isArray(err.errors)) {
    const zodErrors = err.errors.map((error) => ({
      path: error.path.join("."),
      message: error.message,
    }));

    return res.status(statusCode).json({
      success: false,
      message,
      errors: zodErrors,
    });
  }

  console.error("Error: ", message, err); // Log the error for debugging

  res.status(statusCode).json({
    success: false,
    message,
    ...(err.errors && { errors: err.errors }), // Attach errors if available
  });
};

// Middleware to handle 404 errors for non-existent routes
exports.notFoundURLHandler = (req, res) => {
  res.status(404).json({
    success: false,
    message: "URL not found!",
  });
};

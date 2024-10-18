// Utility function for standard success response
exports.successResponse = (res, data) => {
  res.status(200).json({
    success: true,
    data,
  });
};

// Utility function for created response (HTTP 201)
exports.createdResponse = (res, data) => {
  res.status(201).json({
    success: true,
    data,
  });
};

// Utility function for standard error response
exports.errorResponse = (res, error) => {
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Internal Server Error",
    ...(error.errors && { errors: error.errors }), // Include specific error details if available
  });
};

// Standarize response
exports.successResponse = (res, data) => {
  res.status(200).json({
    success: true,
    data,
  });
};

exports.createdResponse = (res, data) => {
  res.status(201).json({
    success: true,
    data,
  });
};

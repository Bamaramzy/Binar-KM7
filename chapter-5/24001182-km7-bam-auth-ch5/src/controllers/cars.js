const carsService = require("../services/cars");
const { successResponse } = require("../utils/response");

exports.getCars = async (req, res) => {
  const data = await carsService.getCars(req);
  return successResponse(res, data, "Cars fetched successfully");
};

exports.getCarsById = async (req, res) => {
  const data = await carsService.getCarsById(req.params.id);
  return successResponse(res, data, "Car fetched successfully");
};

exports.addCars = async (req, res) => {
  const data = await carsService.addCars(req.parsedBody, req.files);
  return successResponse(res, data, "Car added successfully");
};

exports.updateCars = async (req, res) => {
  const data = await carsService.updateCars(
    req.params.id,
    req.parsedBody,
    req.files
  );
  return successResponse(res, data, "Car updated successfully");
};

exports.deleteCars = async (req, res) => {
  const data = await carsService.deleteCars(req.params.id);
  return successResponse(res, data, "Car deleted successfully");
};

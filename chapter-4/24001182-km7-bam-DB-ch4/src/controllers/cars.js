const carService = require("../services/cars");
const { successResponse } = require("../utils/response");

// Get all cars
exports.getCars = async (req, res, next) => {
  const { type, availability, capacity } = req.query;
  const cars = await carService.getCars(type, availability, capacity);
  successResponse(res, cars);
};

// Get a car by ID
exports.getCarById = async (req, res, next) => {
  const { id } = req.params;
  const car = await carService.getCarById(id);
  successResponse(res, car);
};

// Create a new car
exports.createCar = async (req, res, next) => {
  const newCar = {
    ...req.body,
    id: uuidv4(),
    image: req.files ? req.files.carImage : null,
  };

  const createdCar = await carService.createCar(newCar, req.files);
  successResponse(res, createdCar);
};

// Update an existing car
exports.updateCar = async (req, res, next) => {
  const { id } = req.params;
  const updatedCarData = {
    ...req.body,
    image: req.files ? req.files.carImage : undefined,
  };

  const updatedCar = await carService.updateCar(id, updatedCarData, req.files);
  successResponse(res, updatedCar);
};

// Delete a car by ID
exports.deleteCarById = async (req, res, next) => {
  const { id } = req.params;
  const deletedCar = await carService.deleteCarById(id);
  successResponse(res, deletedCar);
};

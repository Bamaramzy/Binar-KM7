const {
  successResponse,
  createdResponse,
  errorResponse,
} = require("../utils/response");
const carService = require("../services/cars");
const { v4: uuidv4 } = require("uuid");

// Get all cars with optional filtering
exports.getCars = async (req, res) => {
  try {
    const { type, availability, capacity } = req.query;
    const cars = carService.getCars(type, availability, capacity);
    successResponse(res, cars);
  } catch (error) {
    errorResponse(res, error);
  }
};

// Get a car by ID
exports.getCarById = async (req, res) => {
  try {
    const car = carService.getCarById(req.params.id);
    successResponse(res, car);
  } catch (error) {
    errorResponse(res, error);
  }
};

// Create a new car
exports.createCar = async (req, res) => {
  try {
    // Extract options and specs from the request body
    const options = req.body.options
      ? Array.isArray(req.body.options)
        ? req.body.options
        : [req.body.options]
      : [];
    const specs = req.body.specs
      ? Array.isArray(req.body.specs)
        ? req.body.specs
        : [req.body.specs]
      : [];

    // Create the new car object with image placed below model
    const newCar = {
      id: uuidv4(),
      plate: req.body.plate,
      manufacture: req.body.manufacture,
      model: req.body.model,
      image: req.files ? req.files.carImage : null,
      rentPerDay: req.body.rentPerDay,
      capacity: req.body.capacity,
      description: req.body.description,
      availbaleAt: req.body.availbaleAt,
      transmission: req.body.transmission,
      available: req.body.available,
      type: req.body.type,
      year: req.body.year,
      options: options,
      specs: specs,
    };

    const createdCar = await carService.createCar(newCar, req.files);
    createdResponse(res, createdCar);
  } catch (error) {
    errorResponse(res, error);
  }
};

// Update an existing car
exports.updateCar = async (req, res) => {
  try {
    // Extract options and specs from the request body
    const options = req.body.options
      ? Array.isArray(req.body.options)
        ? req.body.options
        : [req.body.options]
      : [];
    const specs = req.body.specs
      ? Array.isArray(req.body.specs)
        ? req.body.specs
        : [req.body.specs]
      : [];

    // Create the updated car data object with image placed below model
    const updatedCarData = {
      plate: req.body.plate,
      manufacture: req.body.manufacture,
      model: req.body.model,
      image: req.files ? req.files.carImage : null,
      rentPerDay: req.body.rentPerDay,
      capacity: req.body.capacity,
      description: req.body.description,
      availbaleAt: req.body.availbaleAt,
      transmission: req.body.transmission,
      available: req.body.available,
      type: req.body.type,
      year: req.body.year,
      options: options,
      specs: specs,
    };

    const updatedCar = await carService.updateCar(
      req.params.id,
      updatedCarData,
      req.files
    );
    successResponse(res, updatedCar);
  } catch (error) {
    errorResponse(res, error);
  }
};

// Delete a car by ID
exports.deleteCarById = async (req, res) => {
  try {
    const deletedCar = carService.deleteCarById(req.params.id);
    successResponse(res, deletedCar);
  } catch (error) {
    errorResponse(res, error);
  }
};

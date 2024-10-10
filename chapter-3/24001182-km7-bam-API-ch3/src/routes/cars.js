// src/routes/cars.js
const express = require("express");
const {
  getCars,
  getCarById,
  createCar,
  updateCar,
  deleteCarById,
} = require("../controllers/cars");
const {
  validateGetCars,
  validateGetCarById,
  validateCreateCar,
  validateUpdateCar,
  validateDeleteCarById,
} = require("../midllewares/validation");

const router = express.Router();

router
  .route("/")
  .get(validateGetCars, getCars)
  .post(validateCreateCar, createCar); // Handles create with image

router
  .route("/:id")
  .get(validateGetCarById, getCarById)
  .put(validateUpdateCar, updateCar) // Handles update with image
  .delete(validateDeleteCarById, deleteCarById);

module.exports = router;

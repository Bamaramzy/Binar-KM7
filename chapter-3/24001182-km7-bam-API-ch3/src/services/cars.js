// src/services/cars.js
const carRepository = require("../repositories/cars");
const { imageUpload } = require("../utils/image-kit");
const { NotFoundError, InternalServerError } = require("../utils/request");

exports.getCars = (type, availability, capacity) => {
  return carRepository.getCars(type, availability, capacity);
};

exports.getCarById = (id) => {
  const car = carRepository.getCarById(id);
  if (!car) {
    throw new NotFoundError("Car Not Found!");
  }
  return car;
};

exports.createCar = async (data, files) => {
  // If an image is provided in the request, upload it to ImageKit
  if (files?.carImage) {
    const imageUrl = await imageUpload(files.carImage);
    data.image = imageUrl.url; // Store the URL of the uploaded image
  }

  return carRepository.createCar(data);
};

exports.updateCar = async (id, data, files) => {
  const existingCar = carRepository.getCarById(id);
  if (!existingCar) {
    throw new NotFoundError("Car Not Found!");
  }

  // If a new image is provided, upload it
  if (files?.carImage) {
    const imageUrl = await imageUpload(files.carImage);
    data.image = imageUrl.url;
  }

  const updatedCar = carRepository.updateCar(id, data);
  if (!updatedCar) {
    throw new InternalServerError("Failed to update car!");
  }

  return updatedCar;
};

exports.deleteCarById = (id) => {
  const existingCar = carRepository.getCarById(id);
  if (!existingCar) {
    throw new NotFoundError("Car Not Found!");
  }

  return carRepository.deleteCarById(id);
};

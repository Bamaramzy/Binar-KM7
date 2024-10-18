const carRepository = require("../repositories/cars");
const { imageUpload } = require("../utils/image-kit");
const { NotFoundError, InternalServerError } = require("../utils/request");

exports.getCars = async (type, availability, capacity) => {
  return await carRepository.getCars(type, availability, capacity);
};

exports.getCarById = async (id) => {
  const car = await carRepository.getCarById(id);
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

  // Create the car data
  return await carRepository.createCar(data);
};

exports.updateCar = async (id, data, files) => {
  const existingCar = await carRepository.getCarById(id);
  if (!existingCar) {
    throw new NotFoundError("Car Not Found!");
  }

  // Replicate existing data with new data
  data = {
    ...existingCar, // Keep existing car data
    ...data,
  };

  // If a new image is provided, upload it
  if (files?.carImage) {
    const imageUrl = await imageUpload(files.carImage);
    data.image = imageUrl.url; // Update the image URL
  }

  // Update the car data
  const updatedCar = await carRepository.updateCar(id, data);
  if (!updatedCar) {
    throw new InternalServerError("Failed to update car!");
  }

  return updatedCar;
};

exports.deleteCarById = async (id) => {
  const existingCar = await carRepository.getCarById(id);
  if (!existingCar) {
    throw new NotFoundError("Car Not Found!");
  }

  // Delete the car data
  const deletedCar = await carRepository.deleteCarById(id);
  if (!deletedCar) {
    throw new InternalServerError("Failed to delete car!");
  }

  return deletedCar;
};

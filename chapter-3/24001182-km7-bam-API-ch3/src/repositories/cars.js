const fs = require("fs");
const path = require("path");
const carsFilePath = path.join(__dirname, "../data/cars.json");
let cars = require(carsFilePath);

const saveCars = () => {
  fs.writeFileSync(carsFilePath, JSON.stringify(cars, null, 4), "utf-8");
};

// Get all cars with optional filtering by type, availability, and capacity
exports.getCars = (type, availability, capacity) => {
  return cars.filter((car) => {
    let matches = true;
    if (type) {
      matches = matches && car.type.toLowerCase() === type.toLowerCase();
    }
    if (availability) {
      const availableBool = availability.toLowerCase() === "true";
      matches = matches && car.available === availableBool;
    }
    if (capacity) {
      matches = matches && car.capacity >= parseInt(capacity);
    }
    return matches;
  });
};

// Get car by ID
exports.getCarById = (id) => {
  return cars.find((car) => car.id === id);
};

// Create a new car with optional image upload
exports.createCar = (data) => {
  const newCar = { id: data.id, ...data };
  cars.push(newCar);
  saveCars();
  return newCar;
};

// Update an existing car with optional image upload
exports.updateCar = (id, data) => {
  const carIndex = cars.findIndex((car) => car.id === id);
  if (carIndex === -1) return null;

  // If there's new data (like an image), update the car details
  cars[carIndex] = { ...cars[carIndex], ...data };
  saveCars();
  return cars[carIndex];
};

// Delete car by ID
exports.deleteCarById = (id) => {
  const carIndex = cars.findIndex((car) => car.id === id);
  if (carIndex === -1) return null;

  const deletedCar = cars.splice(carIndex, 1);
  saveCars();
  return deletedCar[0];
};

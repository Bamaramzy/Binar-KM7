const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();

// Get all cars with optional filtering by type, availability, and capacity
exports.getCars = async (type, availability, capacity) => {
  // Define query object
  let query = {};

  // Add filters to query based on provided parameters
  if (type) {
    query.type = { equals: type };
  }
  if (availability !== undefined) {
    const availableBool = availability.toLowerCase() === "true";
    query.available = { equals: availableBool };
  }
  if (capacity) {
    query.capacity = { gte: parseInt(capacity, 10) };
  }

  // Fetch cars based on the query
  const cars = await prisma.cars.findMany({ where: query });

  // Convert BigInt fields to string for safe serialization
  const serializedCars = JSONBigInt.stringify(cars);
  return JSONBigInt.parse(serializedCars);
};

// Get car by ID
exports.getCarById = async (id) => {
  // Find car by ID
  const car = await prisma.cars.findUnique({
    where: { id },
  });

  if (!car) return null;

  // Convert BigInt fields to string for safe serialization
  const serializedCar = JSONBigInt.stringify(car);
  return JSONBigInt.parse(serializedCar);
};

// Create a new car
exports.createCar = async (data) => {
  // Create a new car record
  const newCar = await prisma.cars.create({
    data,
  });

  // Convert BigInt fields to string for safe serialization
  const serializedCar = JSONBigInt.stringify(newCar);
  return JSONBigInt.parse(serializedCar);
};

// Update an existing car
exports.updateCar = async (id, data) => {
  // Check if the car exists
  const carExists = await prisma.cars.findUnique({ where: { id } });
  if (!carExists) return null;

  // Update car record
  const updatedCar = await prisma.cars.update({
    where: { id },
    data,
  });

  // Convert BigInt fields to string for safe serialization
  const serializedCar = JSONBigInt.stringify(updatedCar);
  return JSONBigInt.parse(serializedCar);
};

// Delete car by ID
exports.deleteCarById = async (id) => {
  // Check if the car exists
  const carExists = await prisma.cars.findUnique({ where: { id } });
  if (!carExists) return null;

  // Delete car record
  const deletedCar = await prisma.cars.delete({
    where: { id },
  });

  // Convert BigInt fields to string for safe serialization
  const serializedCar = JSONBigInt.stringify(deletedCar);
  return JSONBigInt.parse(serializedCar);
};

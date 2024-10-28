const carsRepository = require("../repositories/cars");
const { imageUpload } = require("../utils/image-kit");

exports.getCars = async (req) => {
  return Object.keys(req.query).length
    ? carsRepository.getCarsByQuery(
        req.query?.plate,
        req.query?.manufacture_id,
        req.query?.model_id,
        req.query?.type_id
      )
    : carsRepository.getCars();
};

exports.getCarsById = async (id) => {
  return carsRepository.getCarsById(id);
};

exports.addCars = async (data, files) => {
  if (files && files.image) {
    data.image = await imageUpload(files.image);
  }
  // Ensure options are in the correct format for Prisma
  data.options = data.options || []; // Set default if undefined
  return carsRepository.addCars(data);
};

exports.updateCars = async (id, data, files) => {
  if (files && files.image) {
    data.image = await imageUpload(files.image);
  }
  return carsRepository.updateCars(id, data);
};

exports.deleteCars = async (id) => {
  return carsRepository.deleteCars(id);
};

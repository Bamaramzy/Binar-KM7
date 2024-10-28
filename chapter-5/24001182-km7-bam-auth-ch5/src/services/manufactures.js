const manufactureRepository = require("../repositories/manufactures");
const { imageUpload } = require("../utils/image-kit");

exports.getManufactures = () => {
  return manufactureRepository.getManufactures();
};

exports.getManufactureById = async (id) => {
  return await manufactureRepository.getManufactureById(id);
};

exports.createManufacture = async (data, file) => {
  if (file?.logo) {
    data.logo = await imageUpload(file.logo);
  }
  return await manufactureRepository.createManufacture(data);
};

exports.updateManufacture = async (id, data, file) => {
  if (file?.logo) {
    data.logo = await imageUpload(file.logo);
  }
  return await manufactureRepository.updateManufacture(id, data);
};

exports.deleteManufactureById = async (id) => {
  return await manufactureRepository.deleteManufactureById(id);
};

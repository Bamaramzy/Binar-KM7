const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const JSONBigInt = require("json-bigint");

exports.getCars = async () => {
  const carsData = await prisma.cars.findMany({
    include: { manufactures: true, models: true, types: true },
  });
  return JSONBigInt.parse(JSONBigInt.stringify(carsData));
};

exports.getCarsByQuery = async (plate, manufacture_id, model_id, type_id) => {
  const searchedCars = await prisma.cars.findMany({
    where: {
      OR: [
        {
          plate: {
            contains: plate,
            mode: "insensitive",
          },
          manufacture_id,
          model_id,
          type_id,
        },
      ],
    },
  });
  return JSONBigInt.parse(JSONBigInt.stringify(searchedCars));
};

exports.getCarsById = async (id) => {
  const carsById = await prisma.cars.findUnique({
    where: {
      id: id,
    },
  });
  return JSONBigInt.parse(JSONBigInt.stringify(carsById));
};

exports.addCars = async (data) => {
  const newCars = await prisma.cars.create({
    data,
  });
  return JSONBigInt.parse(JSONBigInt.stringify(newCars));
};

exports.updateCars = async (id, data) => {
  const updatedCars = await prisma.cars.update({
    where: { id: Number(id) },
    data,
  });
  return JSONBigInt.parse(JSONBigInt.stringify(updatedCars));
};

exports.deleteCars = async (id) => {
  const deletedCars = await prisma.cars.delete({
    where: {
      id: Number(id),
    },
  });
  return JSONBigInt.parse(JSONBigInt.stringify(deletedCars));
};

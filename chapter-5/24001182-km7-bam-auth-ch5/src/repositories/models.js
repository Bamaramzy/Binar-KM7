const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();

exports.getModels = async (name) => {
  const query = {
    include: {
      manufactures: true,
    },
  };

  if (name) {
    query.where = {
      name: { contains: name, mode: "insensitive" },
    };
  }

  const models = await prisma.models.findMany(query);
  const serializedModels = JSONBigInt.stringify(models);
  return JSONBigInt.parse(serializedModels);
};

exports.getModelById = async (id) => {
  const model = await prisma.models.findUnique({
    where: { id },
    include: {
      manufactures: true,
    },
  });
  const serializedModels = JSONBigInt.stringify(model);
  return JSONBigInt.parse(serializedModels);
};

exports.createModel = async (data) => {
  const newModel = await prisma.models.create({
    data,
    include: {
      manufactures: true,
    },
  });
  const serializedModels = JSONBigInt.stringify(newModel);
  return JSONBigInt.parse(serializedModels);
};

exports.updateModel = async (id, data) => {
  const updatedModel = await prisma.models.update({
    where: { id },
    data,
    include: {
      manufactures: true,
    },
  });
  const serializedModels = JSONBigInt.stringify(updatedModel);
  return JSONBigInt.parse(serializedModels);
};

exports.deleteModelById = async (id) => {
  const deletedModel = await prisma.models.delete({
    where: { id },
    include: {
      manufactures: true,
    },
  });
  const serializedModels = JSONBigInt.stringify(deletedModel);
  return JSONBigInt.parse(serializedModels);
};

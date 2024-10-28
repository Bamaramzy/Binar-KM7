const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();

exports.getAllUsers = async () => {
  const users = await prisma.users.findMany();
  return JSONBigInt.parse(JSONBigInt.stringify(users));
};

exports.updateUser = async (id, data) => {
  const updatedUser = await prisma.users.update({
    where: { id },
    data,
  });
  return JSONBigInt.parse(JSONBigInt.stringify(updatedUser));
};

exports.deleteUser = async (id) => {
  const deletedUser = await prisma.users.delete({
    where: { id },
  });
  return JSONBigInt.parse(JSONBigInt.stringify(deletedUser));
};

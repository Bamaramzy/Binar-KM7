const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

exports.createUser = async (data) => {
  try {
    const saltRounds = 10;
    data.password = await bcrypt.hash(data.password, saltRounds);

    const newUser = await prisma.users.create({
      data,
    });

    return JSONBigInt.parse(JSONBigInt.stringify(newUser));
  } catch (error) {
    throw error;
  }
};

exports.getUserByEmail = async (email) => {
  try {
    const user = await prisma.users.findFirst({
      where: {
        email,
      },
    });

    return JSONBigInt.parse(JSONBigInt.stringify(user));
  } catch (error) {
    throw error;
  }
};

exports.getUserById = async (id) => {
  try {
    const user = await prisma.users.findFirst({
      where: {
        id,
      },
    });

    return JSONBigInt.parse(JSONBigInt.stringify(user));
  } catch (error) {
    throw error;
  }
};

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userRepository = require("../repositories/users");
const { imageUpload } = require("../utils/image-kit");
const { Unauthorized, Forbidden } = require("../utils/request");

exports.register = async (data, file) => {
  try {
    if (!data.name || !data.email || !data.password) {
      throw new Unauthorized("Missing required fields!");
    }

    if (file && file.profile_picture) {
      data.profile_picture = await imageUpload(file.profile_picture);
    }

    const existingUser = await userRepository.getUserByEmail(data.email);
    if (existingUser) {
      throw new Forbidden("Email already exists!");
    }

    // Create user
    const user = await userRepository.createUser(data);
    const token = createToken(user);
    delete user.password;

    return {
      user,
      token,
    };
  } catch (error) {
    throw error;
  }
};

exports.login = async (email, password) => {
  try {
    const user = await userRepository.getUserByEmail(email);
    if (!user) {
      throw new Unauthorized("Email is not found!");
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      throw new Unauthorized("Incorrect password!");
    }

    const token = createToken(user);

    delete user.password;

    return {
      user,
      token,
    };
  } catch (error) {
    throw error;
  }
};

const createToken = (user) => {
  const payload = {
    user_id: user.id,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "72h",
  });

  return token;
};
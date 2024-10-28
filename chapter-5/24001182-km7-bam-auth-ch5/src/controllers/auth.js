const authService = require("../services/auth");
const { successResponse } = require("../utils/response");

exports.register = async (req, res, next) => {
  const data = await authService.register(req.body, req.files);
  successResponse(res, data);
};

exports.login = async (req, res, next) => {
  const data = await authService.login(req.body.email, req.body.password);
  successResponse(res, data);
};

exports.getProfile = async (req, res, next) => {
  const data = req.user;

  delete data.password;

  successResponse(res, data);
};

exports.getAllUsers = async (req, res, next) => {
  const users = await authService.getAllUsers();
  successResponse(res, users);
};

exports.createUser = async (req, res, next) => {
  const user = await authService.createUser(req.body);
  successResponse(res, user);
};

exports.updateUser = async (req, res, next) => {
  const updatedUser = await authService.updateUser(req.params.id, req.body);
  successResponse(res, updatedUser);
};

exports.deleteUser = async (req, res, next) => {
  await authService.deleteUser(req.params.id);
  successResponse(res, { message: "User deleted successfully" });
};

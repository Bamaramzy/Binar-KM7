const { request } = require("express");
const studentService = require("../services/students");
const { successResponse } = require("../utils/response");

exports.getStudents = (req, res, next) => {
  try {
    // Call the service with query params
    const data = studentService.getStudents(
      req.query?.name,
      req.query?.nickName,
      req.query?.bachelor
    );
    successResponse(res, data);
  } catch (error) {
    next(error);
  }
};

exports.getStudentById = (req, res, next) => {
  try {
    // Get student by ID from service
    const { id } = req.params;
    const data = studentService.getStudentById(id);
    successResponse(res, data);
  } catch (error) {
    next(error);
  }
};

exports.createStudent = async (req, res, next) => {
  try {
    // Convert request body to student data format
    const requestBody = {
      ...req.body,
      address: {
        province: req.body["address.province"],
        city: req.body["address.city"],
      },
      education: {
        bachelor: req.body["education.bachelor"],
      },
    };
    delete requestBody["address.province"];
    delete requestBody["address.city"];
    delete requestBody["education.bachelor"];

    // Pass to service with files (profilePicture)
    const data = await studentService.createStudent(requestBody, req.files);
    successResponse(res, data);
  } catch (error) {
    next(error);
  }
};

exports.updateStudent = async (req, res, next) => {
  try {
    // Get the id from params
    const { id } = req.params;

    // Prepare request body for update
    const requestBody = {
      ...req.body,
      address: {
        province: req.body["address.province"],
        city: req.body["address.city"],
      },
      education: {
        bachelor: req.body["education.bachelor"],
      },
    };
    delete requestBody["address.province"];
    delete requestBody["address.city"];
    delete requestBody["education.bachelor"];

    // Call the service to update the student, including handling the file
    const data = await studentService.updateStudent(id, requestBody, req.files);
    successResponse(res, data);
  } catch (error) {
    next(error);
  }
};

exports.deleteStudentById = async (req, res, next) => {
  try {
    // Get the ID and delete the student
    const { id } = req.params;
    const data = await studentService.deleteStudentById(id);
    successResponse(res, data);
  } catch (error) {
    next(error);
  }
};

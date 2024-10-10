const express = require("express");
const {
  validateGetStudents,
  validateGetStudentById,
  validateDeleteStudentById,
  validateCreateStudent,
  validateUpdateStudent,
} = require("../middlewares/students");
const {
  getStudents,
  getStudentById,
  deleteStudentById,
  createStudent,
  updateStudent,
} = require("../controllers/students");

const router = express.Router();

// It will run the URL based on path and the method
router
  .route("/")
  .get(validateGetStudents, getStudents) // Validate and fetch all students
  .post(validateCreateStudent, createStudent); // Validate and create a new student

router
  .route("/:id")
  .get(validateGetStudentById, getStudentById) // Validate and fetch a student by ID
  .put(validateUpdateStudent, updateStudent) // Validate and update a student by ID
  .delete(validateDeleteStudentById, deleteStudentById); // Validate and delete a student by ID

module.exports = router;

const studentRepository = require("../repositories/students");
const { imageUpload } = require("../utils/image-kit");
const { NotFoundError, InternalServerError } = require("../utils/request");

exports.getStudents = (name, nickName, bachelor) => {
  return studentRepository.getStudents(name, nickName, bachelor);
};

exports.getStudentById = (id) => {
  const student = studentRepository.getStudentById(id);
  if (!student) {
    throw new NotFoundError("Student is Not Found!");
  }

  return student;
};

exports.createStudent = async (data, file) => {
  // Upload file to ImageKit if it exists
  if (file?.profilePicture) {
    data.profilePicture = await imageUpload(file.profilePicture);
  }

  // Create the data in the repository
  return studentRepository.createStudent(data);
};

exports.updateStudent = async (id, data, file) => {
  // Find if the student exists
  const existingStudent = studentRepository.getStudentById(id);
  if (!existingStudent) {
    throw new NotFoundError("Student is Not Found!");
  }

  // If a file is provided, upload it to ImageKit and update the student profile picture
  if (file?.profilePicture) {
    data.profilePicture = await imageUpload(file.profilePicture);
  }

  // Update the student data in the repository
  const updatedStudent = studentRepository.updateStudent(id, data);
  if (!updatedStudent) {
    throw new InternalServerError(["Failed to update student!"]);
  }

  return updatedStudent;
};

exports.deleteStudentById = (id) => {
  // Check if the student exists
  const existingStudent = studentRepository.getStudentById(id);
  if (!existingStudent) {
    throw new NotFoundError("Student is Not Found!");
  }

  // Delete the student from the repository
  const deletedStudent = studentRepository.deleteStudentById(id);
  if (!deletedStudent) {
    throw new InternalServerError(["Failed to delete student!"]);
  }

  return deletedStudent;
};

const fs = require("fs");
const path = require("path");
const studentsFilePath = path.join(__dirname, "../../data/students.json");
let students = require(studentsFilePath);

// Function to save the current state of students to students.json
const saveStudents = () => {
  fs.writeFileSync(
    studentsFilePath,
    JSON.stringify(students, null, 4),
    "utf-8"
  );
};

// Get all students (with optional filtering by name, nickname, and bachelor)
exports.getStudents = (name, nickName, bachelor) => {
  const filteredStudents = students.filter((student) => {
    let result = true;
    if (name) {
      result =
        result && student.name.toLowerCase().includes(name.toLowerCase());
    }
    if (nickName) {
      result =
        result &&
        student.nickName.toLowerCase().includes(nickName.toLowerCase());
    }
    if (bachelor) {
      result =
        result &&
        student.education.bachelor
          .toLowerCase()
          .includes(bachelor.toLowerCase());
    }
    return result;
  });
  return filteredStudents;
};

// Get a student by ID
exports.getStudentById = (id) => {
  const student = students.find((student) => student.id === parseInt(id));
  return student || null;
};

// Create a new student
exports.createStudent = (data) => {
  // Automatically assign the next ID
  const maxId = students.length
    ? Math.max(...students.map((student) => student.id))
    : 0;
  const newStudent = {
    id: maxId + 1,
    ...data,
  };

  // Add new student to the array
  students.push(newStudent);

  // Save the updated list to the students.json file
  saveStudents();

  return newStudent;
};

// Update an existing student by ID
exports.updateStudent = (id, data) => {
  const studentIndex = students.findIndex(
    (student) => student.id === parseInt(id)
  );
  if (studentIndex === -1) {
    return null;
  }

  // Update the student's data
  students[studentIndex] = { ...students[studentIndex], ...data };

  // Save the updated data to students.json
  saveStudents();

  return students[studentIndex];
};

// Delete a student by ID
exports.deleteStudentById = (id) => {
  const studentIndex = students.findIndex(
    (student) => student.id === parseInt(id)
  );

  if (studentIndex === -1) {
    return null;
  }

  // Remove the student from the array
  const deletedStudent = students.splice(studentIndex, 1);

  // Save the updated list to the students.json file
  saveStudents();

  return deletedStudent[0];
};

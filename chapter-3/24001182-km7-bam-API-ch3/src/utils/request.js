// src/utils/request.js
class BadRequestError extends Error {
  constructor(errors) {
    super("Bad Request");
    this.statusCode = 400;
    this.errors = errors.map((error) => error.message || error).join(", "); // Join error messages
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message || "Not Found");
    this.statusCode = 404;
  }
}

class InternalServerError extends Error {
  constructor(errors) {
    super("Internal Server Error");
    this.statusCode = 500;
    this.errors = errors || ["An unexpected error occurred"];
  }
}

// Exporting the error classes
module.exports = {
  BadRequestError,
  NotFoundError,
  InternalServerError,
};

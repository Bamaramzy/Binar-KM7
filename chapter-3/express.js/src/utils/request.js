class BadRequestError extends Error {
  constructor(errors) {
    super("Validation failed!");
    this.errors = errors;
    this.status = 400;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message || "Data is Not Found!");
    this.status = 404;
  }
}

class InternalServerError extends Error {
  constructor(errors) {
    super("Internal Server Error");
    this.status = 500;
    this.errors = errors;
  }
}

class ConflictError extends Error {
  constructor(message) {
    super(message || "Conflict error occurred!");
    this.status = 409;
  }
}

module.exports = {
  BadRequestError,
  NotFoundError,
  InternalServerError,
  ConflictError, // New error class for handling conflicts (e.g., duplicate entries)
};

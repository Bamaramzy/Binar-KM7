const { z } = require("zod");
const { BadRequestError } = require("../utils/request");
const { v4: uuidv4 } = require("uuid");

exports.validateGetCars = (req, res, next) => {
  const validateQuery = z.object({
    type: z.string().optional(),
    availability: z.string().optional(),
    capacity: z.number().optional(),
  });

  const resultValidateQuery = validateQuery.safeParse(req.query);
  if (!resultValidateQuery.success) {
    throw new BadRequestError(resultValidateQuery.error.errors);
  }

  next();
};

exports.validateGetCarById = (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const result = validateParams.safeParse(req.params);
  if (!result.success) {
    throw new BadRequestError(result.error.errors);
  }

  next();
};

const parseRequestBody = (req) => {
  req.body.year = req.body.year ? parseInt(req.body.year, 10) : undefined;
  req.body.capacity = req.body.capacity
    ? parseInt(req.body.capacity, 10)
    : undefined;
  req.body.rentPerDay = req.body.rentPerDay
    ? parseInt(req.body.rentPerDay, 10)
    : undefined;
  req.body.available = req.body.available
    ? req.body.available === "true"
    : undefined;
};

exports.validateCreateCar = (req, res, next) => {
  parseRequestBody(req);

  const validateBody = z.object({
    plate: z.string(),
    manufacture: z.string(),
    model: z.string(),
    rentPerDay: z.number().optional(),
    capacity: z.number(),
    description: z.string().optional(),
    availableAt: z.string().optional(),
    transmission: z.string().optional(),
    available: z.boolean().optional(),
    type: z.string(),
    year: z.number(),
    options: z.array(z.string()).optional(),
    specs: z.array(z.string()).optional(),
  });

  const validateFileBody = z
    .object({
      carImage: z
        .object({
          name: z.string(),
          data: z.any(),
        })
        .optional(),
    })
    .optional();

  const result = validateBody.safeParse(req.body);
  if (!result.success) {
    throw new BadRequestError(result.error.errors);
  }

  if (req.files) {
    const resultValidateFiles = validateFileBody.safeParse(req.files);
    if (!resultValidateFiles.success) {
      throw new BadRequestError(resultValidateFiles.error.errors);
    }
  }

  req.body.id = uuidv4();

  next();
};

exports.validateUpdateCar = (req, res, next) => {
  parseRequestBody(req);

  const validateParams = z.object({
    id: z.string(),
  });

  const resultValidateParams = validateParams.safeParse(req.params);
  if (!resultValidateParams.success) {
    throw new BadRequestError(resultValidateParams.error.errors);
  }

  const validateBody = z.object({
    plate: z.string().optional(),
    manufacture: z.string().optional(),
    model: z.string().optional().optional(),
    rentPerDay: z.number().optional(),
    capacity: z.number().optional(),
    description: z.string().optional(),
    availableAt: z.string().optional(),
    transmission: z.string().optional(),
    available: z.boolean().optional(),
    type: z.string().optional(),
    year: z.number().optional(),
    options: z.array(z.string()).optional(),
    specs: z.array(z.string()).optional(),
  });

  const validateFileBody = z
    .object({
      carImage: z
        .object({
          name: z.string(),
          data: z.any(),
        })
        .optional(),
    })
    .optional();

  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    throw new BadRequestError(resultValidateBody.error.errors);
  }

  if (req.files) {
    const resultValidateFiles = validateFileBody.safeParse(req.files);
    if (!resultValidateFiles.success) {
      throw new BadRequestError(resultValidateFiles.error.errors);
    }
  }

  next();
};

exports.validateDeleteCarById = (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const result = validateParams.safeParse(req.params);
  if (!result.success) {
    throw new BadRequestError(result.error.errors);
  }

  next();
};

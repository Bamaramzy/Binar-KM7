const { z } = require("zod");
const { BadRequestError } = require("../utils/request");
const { v4: uuidv4 } = require("uuid");

exports.validateGetCars = (req, res, next) => {
  const validateQuery = z.object({
    type: z.string().optional(),
    availability: z.string().optional(),
    capacity: z.string().optional(),
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

exports.validateCreateCar = (req, res, next) => {
  const validateBody = z.object({
    plate: z.string(),
    manufacture: z.string(),
    model: z.string(),
    type: z.string(),
    year: z.string(),
    capacity: z.string(),
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
    model: z.string().optional(),
    type: z.string().optional(),
    year: z.string().optional(),
    capacity: z.string().optional(),
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

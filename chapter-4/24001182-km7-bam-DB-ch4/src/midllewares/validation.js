const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

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

exports.validateGetCars = (req, res, next) => {
  const schema = z.object({
    type: z.string().optional(),
    availability: z.string().optional(),
    capacity: z.number().optional(),
  });

  const result = schema.safeParse(req.query);
  if (!result.success) throw new BadRequestError(result.error.errors);
  next();
};

exports.validateGetCarById = (req, res, next) => {
  const schema = z.object({
    id: z.string(),
  });

  const result = schema.safeParse(req.params);
  if (!result.success) throw new BadRequestError(result.error.errors);
  next();
};

exports.validateCreateCar = (req, res, next) => {
  parseRequestBody(req);

  const bodySchema = z.object({
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

  const fileSchema = z
    .object({
      carImage: z
        .object({
          name: z.string(),
          data: z.any(),
        })
        .optional(),
    })
    .optional();

  const result = bodySchema.safeParse(req.body);
  if (!result.success) throw new BadRequestError(result.error.errors);

  if (req.files) {
    const fileResult = fileSchema.safeParse(req.files);
    if (!fileResult.success) throw new BadRequestError(fileResult.error.errors);
  }

  next();
};

exports.validateUpdateCar = (req, res, next) => {
  parseRequestBody(req);

  const paramSchema = z.object({
    id: z.string(),
  });

  const bodySchema = z.object({
    plate: z.string().optional(),
    manufacture: z.string().optional(),
    model: z.string().optional(),
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

  const fileSchema = z
    .object({
      carImage: z
        .object({
          name: z.string(),
          data: z.any(),
        })
        .optional(),
    })
    .optional();

  const paramResult = paramSchema.safeParse(req.params);
  if (!paramResult.success) throw new BadRequestError(paramResult.error.errors);

  const bodyResult = bodySchema.safeParse(req.body);
  if (!bodyResult.success) throw new BadRequestError(bodyResult.error.errors);

  if (req.files) {
    const fileResult = fileSchema.safeParse(req.files);
    if (!fileResult.success) throw new BadRequestError(fileResult.error.errors);
  }

  next();
};

exports.validateDeleteCarById = (req, res, next) => {
  const schema = z.object({
    id: z.string(),
  });

  const result = schema.safeParse(req.params);
  if (!result.success) throw new BadRequestError(result.error.errors);
  next();
};

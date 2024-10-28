const express = require("express");

const authRouter = require("./auth");
const carsRouter = require("./cars");
const modelsRouter = require("./models");
const typeRouter = require("./type");
const manufacturesRouter = require("./manufactures");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/cars", carsRouter);
router.use("/models", modelsRouter);
router.use("/type", typeRouter);
router.use("/manufactures", manufacturesRouter);

module.exports = router;

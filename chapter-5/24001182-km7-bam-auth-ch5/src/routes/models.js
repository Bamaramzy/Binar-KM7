const express = require("express");
const { authorization } = require("../middlewares/auth");
const { adminRole, userRole } = require("../constants/auth");
const {
  validateGetModels,
  validateGetModelById,
  validateDeleteModelById,
  validateCreateModel,
  validateUpdateModel,
} = require("../middlewares/models");
const {
  getModels,
  getModelById,
  deleteModelById,
  createModel,
  updateModel,
} = require("../controllers/models");

const router = express.Router();

router.get(
  "/",
  authorization(adminRole, userRole),
  validateGetModels,
  getModels
);
router.post("/", authorization(adminRole), validateCreateModel, createModel);
router.get(
  "/:id",
  authorization(adminRole),
  validateGetModelById,
  getModelById
);
router.put("/:id", authorization(adminRole), validateUpdateModel, updateModel);
router.delete(
  "/:id",
  authorization(adminRole),
  validateDeleteModelById,
  deleteModelById
);

module.exports = router;

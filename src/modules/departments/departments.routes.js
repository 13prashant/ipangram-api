const express = require("express");
const Department = require("../departments/departments.model");
const { queryResults } = require("../../middlewares/queryResults");
const { protect, authorize } = require("../../middlewares/auth.middleware");
const {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} = require("./departments.controller");

const router = express.Router();

router.get("/", queryResults(Department), getDepartments);
router.post("/", protect, authorize("manager"), createDepartment);
router
  .route("/:id")
  .put(protect, authorize("manager"), updateDepartment)
  .delete(protect, authorize("manager"), deleteDepartment);

module.exports = router;

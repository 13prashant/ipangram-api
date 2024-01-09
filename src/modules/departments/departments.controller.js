const ErrorResponse = require("../../utils/errorResponse");
const Department = require("./departments.model");

// @desc      Get departments
// @route     GET /api/v1/departments
// @access    Public
exports.getDepartments = async (req, res, next) => {
  try {
    res.status(200).json(res.queryResults);
  } catch (error) {
    next(error);
  }
};

// @desc      Create department
// @route     POST /api/v1/departments
// @access    Private
exports.createDepartment = async (req, res, next) => {
  try {
    // Add user to req.boody
    req.body.user = req.user.id;

    const department = await Department.create(req.body);

    res.status(201).json({
      success: true,
      data: department,
    });
  } catch (error) {
    next(error);
  }
};

// @desc      Update department
// @route     PUT /api/v1/departments/:id
// @access    Private
exports.updateDepartment = async (req, res, next) => {
  console.log(req.body, req.params.id);
  try {
    let department = await Department.findById(req.params.id);

    if (!department) {
      return next(
        new ErrorResponse(
          `Department not found with id of ${req.params.id}`,
          404
        )
      );
    }

    department = await Department.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: department,
    });
  } catch (error) {
    next(error);
  }
};

// @desc      Delete department
// @route     DELETE /api/v1/departments/:id
// @access    Private
exports.deleteDepartment = async (req, res, next) => {
  try {
    let department = await Department.findById(req.params.id);

    if (!department) {
      return next(
        new ErrorResponse(
          `Department not found with id of ${req.params.id}`,
          404
        )
      );
    }

    await Department.findByIdAndDelete(req.params.id);

    res.sttatus(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

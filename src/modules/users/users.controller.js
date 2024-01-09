// @desc      Get employees
// @route     GET /api/v1/users/employees
// @access    Public
exports.getUsers = async (req, res, next) => {
  try {
    res.status(200).json(res.queryResults);
  } catch (error) {
    next(error);
  }
};

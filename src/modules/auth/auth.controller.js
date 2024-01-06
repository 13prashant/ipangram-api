const User = require("../users/users.model");
const { getSignedJwt } = require("../../services/jwt.service");
const ErrorResponse = require("../../utils/errorResponse");
const { COOKIE_EXPIRES_IN } = require("../../utils/constants");

// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const foundUser = await User.findOne({ email });

    if (foundUser) {
      return next(
        new ErrorResponse(`User with email: ${email} already exists`, 400)
      );
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    user.save();

    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// Get jwt, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  const token = getSignedJwt({ id: user._id });

  const options = {
    expires: new Date(Date.now() + COOKIE_EXPIRES_IN),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
  });
};

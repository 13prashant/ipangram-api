const jwt = require("jsonwebtoken");
const { JWT_EXPIRES_IN } = require("../utils/constants");

exports.getSignedJwt = (doc) => {
  return jwt.sign(doc, process.env.JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

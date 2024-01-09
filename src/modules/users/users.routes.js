const express = require("express");
const User = require("../users/users.model");
const { queryResults } = require("../../middlewares/queryResults");
const { getUsers } = require("./users.controller");

const router = express.Router();

router.get("/", queryResults(User), getUsers);

module.exports = router;

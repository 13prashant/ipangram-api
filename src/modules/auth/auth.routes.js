const express = require("express");
const { register, login, logout } = require("./auth.controller");

const router = express.Router();

router.post("/register", register);
router.get("/login", login);
router.get("/logout", logout);

module.exports = router;

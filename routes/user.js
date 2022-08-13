const express = require("express");
const router = express.Router();
const User = require("../controller/user");

router.route("/signup").get(User.signupPage).post(User.signup);
router.route("/login").get(User.loginPage).post(User.login);
module.exports = router;

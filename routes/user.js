const express = require("express");
const router = express.Router();
const User = require("../controller/user");

router.route("/signup").get(User.signupPage).post(User.signup);
module.exports = router;

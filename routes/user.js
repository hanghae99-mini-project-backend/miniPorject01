const express = require("express");
const router = express.Router();
const User = require("../controller/user");

router.route("/signup").get(User.signupPage);
module.exports = router;

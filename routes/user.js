const express = require("express");
const router = express.Router();
const User = require("../controller/user");
const loginUserCheck = require("../middleware/loginUserCheck");

router
  .route("/signup")
  .get(loginUserCheck, User.signupPage)
  .post(loginUserCheck, User.signup);
router
  .route("/login")
  .get(loginUserCheck, User.loginPage)
  .post(loginUserCheck, User.login);
//router.route("/logout").post(User.logout);
module.exports = router;

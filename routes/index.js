const express = require("express");
const User = require("./user");

const router = express.Router();

router.use("/user", User);

module.exports = router;

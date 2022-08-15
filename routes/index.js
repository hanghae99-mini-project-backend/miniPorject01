const express = require("express");
const User = require("./user");
const Post = require("./post");
const Comment = require("./comment");

const router = express.Router();

router.use("/user", User);
router.use("/post", Post);
router.use("/post/comment", Comment);

module.exports = router;

const express = require("express");
const router = express.Router();
const Comment = require("../controller/comment");
const authenticateUser = require("../middleware/authentication");

router.route("/:postId").post(authenticateUser, Comment.createComment);

module.exports = router;

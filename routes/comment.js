const express = require("express");
const router = express.Router();
const Comment = require("../controller/comment");

router.route("/:postId").post(Comment.createComment);

module.exports = router;

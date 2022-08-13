const express = require("express");
const router = express.Router();
const Post = require("../controller/post");

router.route("/post").get(Post.mainPage);
router.route("/createPost").get(Post.createPostPage).post(Post.createPost);
module.exports = router;

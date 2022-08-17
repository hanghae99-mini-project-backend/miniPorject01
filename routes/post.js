const express = require("express");
const router = express.Router();
const Post = require("../controller/post");
const authenticateUser = require("../middleware/authentication");
router.route("/").get(Post.mainPage);
router
  .route("/createPost")
  .get(authenticateUser, Post.createPostPage)
  .post(authenticateUser, Post.createPost);
router
  .route("/:postId")
  .get(Post.detailPost)
  .put(authenticateUser, Post.putPost)
  .delete(authenticateUser, Post.deletePost);

module.exports = router;

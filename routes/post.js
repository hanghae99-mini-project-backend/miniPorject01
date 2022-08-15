const express = require("express");
const router = express.Router();
const Post = require("../controller/post");
const authenticateUser = require("../middleware/authentication");
router.route("/").get(Post.mainPage);
router
  .route("/createPost")
  .get(authenticateUser, Post.createPostPage)
  .post(Post.createPost);
router
  .route("/:postId")
  .get(Post.detailPost)
  .put(Post.putPost)
  .delete(Post.deletePost);


module.exports = router;

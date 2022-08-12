const express = require("express");
const router = express.Router();
const Post = require("../controller/post");

router.route("/").get(Post.mainPage);
module.exports = router;

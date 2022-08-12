const { StatusCodes } = require("http-status-codes");
const Post = require("../models/user");

exports.mainPage = (req, res) => {
    Post.getAll((error, data) => {
      if (error) {
        res.status(500).json({ message: error.message });
      } else if (data.length) {
        res.status(200).json({ data });
      } else {
        res.status(400).json({ message: "글이 없습니다." });
      }
    });
  };
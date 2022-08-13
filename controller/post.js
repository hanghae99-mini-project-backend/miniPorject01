const Post = require("../models/post");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");

// bootcamp 소개 글 전체 가져오기
exports.mainPage = (req, res) => {
  Post.getAll((err, data) => {
    if (err) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: err.message });
    } else if (data.length) {
      res.status(StatusCodes.OK).json({ data });
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "글이 없습니다." });
    }
  });
};

exports.createPostPage = (req, res) => {
  res.send("Hello world");
};

// bootcamp 소개글 생성
exports.createPost = (req, res) => {
  const {
    user_idx,
    bootcampName,
    bootcampCompany,
    totalWeeks,
    onoffLine,
    price,
    position,
    describe,
  } = req.body;

  if (
    !bootcampName ||
    !bootcampCompany ||
    !totalWeeks ||
    !onoffLine ||
    !price ||
    !position ||
    !describe
  ) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "데이터 형식에 맞지 않습니다." });
  }
  console.log(bootcampName, describe);
  const post = new Post(
    user_idx,
    bootcampName,
    bootcampCompany,
    totalWeeks,
    onoffLine,
    price,
    position,
    describe
  );
  console.log(post.position);
  post.createPost(post, (err, data) => {
    if (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: err.message,
      });
    } else {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ data });
    }
  });
};

const Post = require("../models/user");
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

// bootcamp 소개글 생성
exports.createPost = (req, res) => {
  const {
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
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "데이터 형식에 맞지 않습니다." });
  }
  const post = new Post({
    bootcampName,
    bootcampCompany,
    totalWeeks,
    onoffLine,
    price,
    position,
    describe,
  });

  post.createPost((err, data) => {
    if (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: err.message,
      });
    } else {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ data });
    }
  });
};

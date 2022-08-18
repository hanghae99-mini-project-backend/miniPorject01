const Comment = require("../models/comment");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const comment = new Comment();

exports.createComment = (req, res) => {
  const postId = req.params.postId;
  const userIdx = res.locals.user.USER_IDX;
  const newComment = {
    userIdx: userIdx,
    bootcampIdx: postId,
    content: req.body.content,
    rating: req.body.rating,
  };

  if (!newComment.userIdx || !newComment.content || !newComment.rating) {
    throw new BadRequestError(
      "데이터 형식에 맞지 않습니다. 다시 입력해 주세요."
    );
  }

  comment.createComment(newComment, (err, data) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    } else {
      return res.status(StatusCodes.OK).json({ data });
    }
  });
};

// 댓글 수정
exports.putComment = (req, res) => {
  const commentId = req.params.commentId;
  const postId = req.params.postId;
  const userIdx = res.locals.user.USER_IDX;
  const modifiedComment = {
    content: req.body.content,
    rating: req.body.rating,
  };
  if (!modifiedComment.content || !modifiedComment.rating) {
    throw new BadRequestError(
      "데이터 형식에 맞지 않습니다. 다시 입력해 주세요."
    );
  }
  
  comment.checkMyComment(commentId, postId, userIdx, (err, data) => {
    if (data < 1) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "게시된 댓글이 없습니다." });
    } else if (err) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
    console.log("데이터 갯수 : ", data);

    comment.putComment(commentId, userIdx, modifiedComment, (err, data) => {
      if (err) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
      }
      res.status(StatusCodes.OK).json({ message: "댓글 수정이 완료되었습니다." });
    });
  });
};

// 댓글 삭제
exports.deleteComment = (req, res) => {
  const commentId = req.params.commentId;
  const postId = req.params.postId;
  const userIdx = res.locals.user.USER_IDX;

  comment.checkMyComment(commentId, postId, userIdx, (err, data) => {
    if (data < 1) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "게시된 댓글이 없습니다." });
    } else if (err) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
    console.log("데이터 갯수 : ", data);

    comment.deleteComment(commentId, userIdx, (err, data) => {
      if (err) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
      }
      res.status(StatusCodes.OK).json({ message : "댓글 삭제가 완료되었습니다." });
    });
  });
};

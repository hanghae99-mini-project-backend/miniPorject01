const Comment = require("../models/comment");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const comment = new Comment();


exports.createComment = (req, res) => {
    const postId = req.params.postId;
    const newComment = {
      bootcamp_idx : postId,
      user_idx: req.body.user_idx,
      content: req.body.content,
      rating: req.body.rating,
    };
  
    if (
      !newComment.user_idx ||
      !newComment.content ||
      !newComment.rating
    ) {
      throw new BadRequestError("데이터 형식에 맞지 않습니다. 다시 입력해 주세요.");
    }
  
    comment.createComment(newComment, (err, data) => {
      if (err) {
        return res.status(500).json({
          message: err.message
        });
      } else {
        return res.status(StatusCodes.OK).json({ data });
      }
    });
  }


const Post = require("../models/post");
const Comment = require("../models/comment")
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const post = new Post();
const comment = new Comment();


// bootcamp 소개 글 전체 가져오기
exports.mainPage = (req, res) => {
  post.getAll((err, data) => {
    if (err) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: err.message });
    } else if (data.length) {
      res.status(StatusCodes.OK).json({ data });
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "글이 없습니다." });
    }
  });
};

exports.createPostPage = (req, res) => {
  res.send("Hello world");
};

// bootcamp 소개글 생성
exports.createPost = (req, res) => {
  const newPost = req.body;

  if (
    !newPost.user_idx ||
    !newPost.bootcampName ||
    !newPost.bootcampCompany ||
    !newPost.totalWeeks ||
    !newPost.onoffLine ||
    !newPost.price ||
    !newPost.position ||
    !newPost.describe
  ) {
    throw new BadRequestError("데이터 형식에 맞지 않습니다. 다시 입력해 주세요.");
  }

  post.createPost(newPost, (err, data) => {
    if (err) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: err.message,
      });
    } else {
      return res.status(StatusCodes.CREATED).json({ data });
    }
  });
}

exports.detailPost = (req, res) => {
  const postId = req.params.postId;
  post.getOne(postId, (err,postData) => {
    if (err) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: err.message });
    } else if (postData.length) {

      // postId가 있을 경우, postId에 포함된 댓글 모두 가져오기
      comment.getAll(postId, (err,commentData) => {
        if (err) {
          res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: err.message });
        } else if (commentData.length) {
          res.status(StatusCodes.OK).json({ post : postData[0], comment : commentData });
        } else {
          res.status(StatusCodes.OK).json({ post : postData[0], comment : "댓글이 없습니다." });
        }
      });
    
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "글이 없습니다." });
    }
  });
}


// bootcamp 소개글 수정
// user_idx는 기능 구현 후 수정
exports.putPost = (req, res) => {
  const postId = req.params.postId;
  const user_idx= req.body.user_idx;
  const modifiedPost = {
    bootcamp_name: req.body.bootcampName,
    bootcamp_company: req.body.bootcampCompany,
    total_weeks: req.body.totalWeeks,
    on_off_line: req.body.onoffLine,
    price: req.body.price,
    position: req.body.position,
    describe: req.body.describe,
  };
  if (
    !modifiedPost.bootcamp_name ||
    !modifiedPost.bootcamp_company ||
    !modifiedPost.total_weeks ||
    !modifiedPost.on_off_line ||
    !modifiedPost.price ||
    !modifiedPost.position ||
    !modifiedPost.describe
  ) {
    throw new BadRequestError("데이터 형식에 맞지 않습니다. 다시 입력해 주세요.");
  }

  post.checkMyPost(postId, user_idx, (err, data) => {
    if (data < 1){
      return res.status(StatusCodes.BAD_REQUEST).json({message : "게시된 글이 없습니다."})
    } else if (err){
      return res.status(500).json({message : err.message});
    }
    console.log("데이터 갯수 : ",data);

    post.putPost(postId, modifiedPost, (err, data) => {
      if (err){
        return res.status(StatusCodes.BAD_REQUEST).json({message : err.message});
      }
      res.status(StatusCodes.OK).json({data});
    });
  });
}


exports.deletePost = (req, res) => {
  const postId = req.params.postId;
  // user_idx 임시 지정
  const user_idx= 24;
  post.checkMyPost(postId, user_idx, (err, data) => {
    if (data < 1){
      return res.status(StatusCodes.BAD_REQUEST).json({message : "본인이 쓴 글이 아니므로 지울 수 없습니다."})
    } else if (err){
      return res.status(500).json({message : err.message});
    }
    console.log("데이터 갯수 : ",data);

    post.deletePost(postId, user_idx, (err, data) => {
      if (err){
        return res.status(StatusCodes.BAD_REQUEST).json({message : err.message});
      }
      res.status(StatusCodes.OK).json({data});
    });
  })
}
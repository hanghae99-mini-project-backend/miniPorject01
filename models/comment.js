const { sql } = require("../dbconfig/config");
const sqlQuery = require("../query/comment");

class Comment {
  async createComment(newComment, result) {
    const newCommentArr = Object.entries(newComment).map((element)=>element[1]);
    await sql.query(sqlQuery.createCommentQuery, newCommentArr, (err, data) => {
      if (err) {
        return result(err, null);
      }
      result(null, data);
    });
  }

  async getAll(postId, result) {
    await sql.query(sqlQuery.getAllCommentQuery(postId), (err, data) => {
      if (err) {
        return result(err, null);
      }
      result(null, data);
    });
  }


  async checkMyComment(commentId, postId, user_idx, result) {
    await sql.query(
      sqlQuery.checkMyPostQuery,
      [commentId, postId, user_idx],
      (err, data) => {
        if (err) {
          console.log("에러가 나옴 : ", err);
          return result(err, null);
        }
        console.log("checkMyPost data : ", data);
        return result(null, data[0].CNT);
      }
    );
  }


  async putComment(commentId, userIdx, modifiedComment, result){
    const modifiedCommentArr = Object.entries(modifiedComment).map((element) => element[1]);
    await sql.query(
      sqlQuery.putCommentQuery(commentId, userIdx), modifiedCommentArr, (err, data) => {
        if (err) {
          return result(err, null);
        }
        result(null, data);
      }
    );
  }


  async deleteComment(commentId, userIdx, result){
    await sql.query(
      sqlQuery.deleteCommentQuery,
      [commentId, userIdx],
      (err, data) => {
        if (err) {
          return result(err, null);
        }
        result(null, data);
      }
    );
  }
}

module.exports = Comment;
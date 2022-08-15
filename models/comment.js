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
}

module.exports = Comment;
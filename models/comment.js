const { sql } = require("../dbconfig/config");
const sqlQuery = require("../query/comment");

class Comment {
    async createComment(newComment, result) {
        await sql.query(sqlQuery.createCommentQuery, newComment, (err, data) => {
          if (err) {
            return result(err, null);
          }
          result(null, data);
        });
      }
}

module.exports = Comment;
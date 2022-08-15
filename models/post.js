const { sql } = require("../dbconfig/config");
const sqlQuery = require("../query/post");

class Post {
  async getAll(result) {
    await sql.query(sqlQuery.getAllPostQuery, (err, data) => {
      if (err) {
        return result(err, null);
      }
      result(null, data);
    });
  }

  async createPost(newPost, result) {
    const newPostArr = Object.entries(newPost).map((element) => element[1]);
    await sql.query(sqlQuery.createPostQuery, newPostArr, (err, data) => {
      if (err) {
        return result(err, null);
      }
      result(null, data);
    });
  }

  async getOne(postId, result) {
    await sql.query(sqlQuery.getOnePostQuery, postId, (err, data) => {
      if (err) {
        return result(err, null);
      }
      result(null, data);
    });
  }

  async checkMyPost(postId, user_idx, result) {
    await sql.query(
      sqlQuery.checkMyPostQuery,
      [postId, user_idx],
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

  async putPost(postId, modifiedPost, result) {
    const modifiedPostArr = Object.entries(modifiedPost).map((element) => element[1]);
    await sql.query(
      sqlQuery.putPostQuery(postId),modifiedPostArr,(err, data) => {
        if (err) {
          return result(err, null);
        }
        result(null, data);
      }
    );
  }

  async deletePost(postId, user_idx, result) {
    await sql.query(
      sqlQuery.deletePostQuery,
      [postId, user_idx],
      (err, data) => {
        if (err) {
          return result(err, null);
        }
        result(null, data);
      }
    );
  }
}

module.exports = Post;
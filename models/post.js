const { sql } = require("../dbconfig/config");

class Post {
  constructor(
    user_idx,
    bootcampName,
    bootcampCompany,
    totalWeeks,
    onoffLine,
    price,
    position,
    describe
  ) {
    this.user_idx = user_idx;
    this.bootcamp_name = bootcampName;
    this.bootcamp_company = bootcampCompany;
    this.total_weeks = totalWeeks;
    this.on_off_line = onoffLine;
    this.price = price;
    this.position = position;
    this.describe = describe;
  }

  static async getAll(result) {
    const sqlQuery = "SELECT * FROM BOOTCAMP_INFO";
    await sql.query(sqlQuery, function (err, data) {
      if (err) {
        return result(err, null);
      }
      result(null, data);
    });
  }

  async createPost(newPost, result) {
    console.log(newPost);
    const sqlQuery = "INSERT INTO BOOTCAMP_INFO SET ? ";
    await sql.query(sqlQuery, newPost, function (err, data) {
      if (err) {
        return result(err, null);
      }
      result(null, data);
    });
  }
}

module.exports = Post;

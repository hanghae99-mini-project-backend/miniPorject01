const sql = require("../dbconfig/dbconfig");

class Post {
  constructor(post) {
    this.bootcampName = post.bootcampName;
    this.bootCampCompany = post.bootcampCompany;
    this.totalWeeks = post.totalWeeks;
    this.onoffLine = post.onoffLine;
    this.price = post.price;
    this.position = post.position;
    this.describe = post.describe;
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
    const sqlQuery = "INSERT INTO BOOTCAMP_INFO SET ?";
    await sql.query(sqlQuery, newPost, function (err, data) {
      if (err) {
        return result(err, null);
      }
      result(null, data);
    });
  }
}

const { sql } = require("../dbconfig/config");
const bcrypt = require("bcryptjs");

//constructor
const User = function (user) {
  this.id = user.id;
  this.name = user.name;
  this.password = user.password;
};

User.create = async (newUser, result) => {
  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(newUser.password, salt);

  const sqlQuery = `INSERT INTO USER SET ?`;
  await sql.query(sqlQuery, newUser, (error, res) => {
    if (error) {
      return result(error, null);
    }
    return result(null, res);
  });
};

User.checkDuplicatedId = async (id, result) => {
  const esc_id = sql.escape(id);
  const sqlQuery = `SELECT COUNT(id) AS CNT FROM USER WHERE id = ${esc_id}`;
  await sql.query(sqlQuery, (error, res) => {
    if (error) {
      return result(error, null);
    }
    console.log("models/user : ",res[0].CNT);
    return result(null, res[0].CNT);
  });
};



module.exports = User;

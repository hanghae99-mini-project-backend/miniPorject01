const { sql } = require("../dbconfig/config");
const bcrypt = require("bcryptjs");
const sqlQuery = require("../query/user");

//constructor
const User = function (user) {
  this.id = user.id.replace(/(\s*)/g, "");
  this.name = user.name.replace(/(\s*)/g, "");
  this.password = user.password.replace(/(\s*)/g, "");
};

User.create = async (newUser, result) => {
  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(newUser.password, salt);
  console.log(newUser);
  await sql.query(sqlQuery.insUser, newUser, (error, res) => {
    if (error) {
      return result(error, null);
    } else {
      return result(null, res);
    }
  });
};

User.checkDuplicatedId = async (newUser, result) => {
  const esc_id = sql.escape(newUser);
  await sql.query(sqlQuery.checkDuplicated(esc_id), (error, res) => {
    if (error) {
      return result(error, null);
    }
    console.log("models/user : ", res[0].CNT);
    return result(null, res[0].CNT);
  });
};

module.exports = User;

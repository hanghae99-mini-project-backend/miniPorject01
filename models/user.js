const { sql } = require("../dbconfig/config");
const bcrypt = require("bcryptjs");
const sqlQuery = require("../query/user");
const userService = require("../service/user.service");
const jwt = require("jsonwebtoken");

//constructor
const User = function (user) {
  this.id = user.id.replace(/(\s*)/g, "");
  this.name = user.name;
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
User.loginAccess = async (newUser, result) => {
  const esc_id = sql.escape(newUser.id);
  await sql.query(sqlQuery.loginQuery(esc_id), (error, res) => {
    if (res.length <= 0) {
      return result({ msg: "NO_DATE" });
    } else {
      userService
        .checkPassword(newUser.password, res[0].PASSWORD)
        .then((data) => {
          if (!data) {
            return result({ msg: "INCORRECT" });
          }
          return result(null, data);
        });
    }
  });
};
User.createJWT = (newUser) => {
  return jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};
User.findIdxById = async (userId, result) => {
  const esc_id = sql.escape(userId);
  await sql.query(sqlQuery.getUserIdx(esc_id), (error, res) => {
    if (res.length <= 0) {
      return result(error, null);
    }
    return result(null, res);
  });
};
module.exports = User;

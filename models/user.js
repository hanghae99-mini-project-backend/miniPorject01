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

module.exports = User;

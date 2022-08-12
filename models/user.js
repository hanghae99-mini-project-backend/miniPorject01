const { sql } = require("../dbconfig/config");

//constructor
const User = function (user) {
  this.id = user.id;
  this.name = user.name;
  this.password = user.password;
};

module.exports = User;

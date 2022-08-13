const bcrypt = require("bcryptjs");

exports.checkPassword = async (securedPassword, password) => {
  const compare = await bcrypt.compare(securedPassword, password);
  return compare;
};

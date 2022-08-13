const bcrypt = require("bcryptjs");

//비밀번호 확인 재사용
exports.checkPassword = async (securedPassword, password) => {
  const compare = await bcrypt.compare(securedPassword, password);
  return compare;
};

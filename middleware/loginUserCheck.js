//로그인 유효성
const { loginError } = require("../errors");
module.exports = (req, res, next) => {
  const cookies = req.cookies[process.env.COOKIE_NAME];
  if (cookies) {
    throw new loginError("이미 로그인이 되어있습니다.");
  }
  next();
};

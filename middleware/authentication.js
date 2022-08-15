const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");
const auth = async (req, res, next) => {
  //check header jwt 유효성 검사
  // const cookies = req.cookies[process.env.COOKIE_NAME];
  // if (!cookies || !cookies.startsWith("Bearer")) {
  //   throw new UnauthenticatedError("로그인을 해주세요");
  // }
  // const token = cookies.split(" ")[1];
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("로그인을 해주세요");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    await User.findIdxById(payload.userId, (err, data) => {
      if (err) {
        throw new UnauthenticatedError("사용자 인증 오류");
      }
      //req.user = data[0].USER_IDX;
      res.locals.user = data[0];
      next();
    });
  } catch (error) {
    throw new UnauthenticatedError("사용자 인증 오류");
  }
};
module.exports = auth;

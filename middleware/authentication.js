const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");
const auth = (req, res, next) => {
  //check header jwt 유효성 검사
};
module.exports = auth;

const { StatusCodes } = require("http-status-codes");
const CustomApiError = require("./customApiError");
//make error class for authentication
class loginError extends CustomApiError {
  constructor(message) {
    super(message);
    //403 error
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

module.exports = loginError;

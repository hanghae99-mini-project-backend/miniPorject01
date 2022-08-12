const { StatusCodes } = require("http-status-codes");
const CustomApiError = require("./customApiError");
//make error class for 404 not found error
class NotFoundError extends CustomApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFoundError;

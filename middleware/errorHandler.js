const { StatusCodes } = require("http-status-codes");
exports.errorHandlerMiddleware = (err, req, res, next) => {
  //new custom error
  let customError = {
    //set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong try again later",
  };
  // if (err instanceof CustomApiError) {
  //   return res.status(err.statusCode).json({ msg: err.message });
  // }

  if (err.name === "ValidationError") {
    console.log(Object.values(err.errors));
    customError.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(" 또는 ");
    customError.statusCode = 400;
  }
  //에러코드를 보는 status
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
  return res
    .status(customError.statusCode)
    .json({ message: customError.message });
};

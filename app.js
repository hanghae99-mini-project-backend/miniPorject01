require("dotenv").config();
const express = require("express");
const app = express();
const { sql } = require("mysql");
const route = require("./routes");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const hpp = require("hpp");

const { errorHandlerMiddleware } = require("./middleware/errorHandler");

app.use(hpp());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use("/api", route);
app.use(errorHandlerMiddleware);

const port = process.env.PORT;
app.listen(port || 5000, function () {
  console.log(`Server started on port ${port}`);
});

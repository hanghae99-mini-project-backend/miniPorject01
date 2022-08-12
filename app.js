const express = require("express");
const app = express();
const mysql = require("mysql");
require("dotenv").config();
const route = require("./routes");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use("/api", route);
const port = process.env.PORT;
app.listen(port || 5000, function () {
  console.log(`Server started on port ${port}`);
});

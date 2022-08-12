const mysql = require("mysql");
const express = require("express");

const sql = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER_NAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
});

module.exports = { sql };

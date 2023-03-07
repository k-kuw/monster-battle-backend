const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "monster-battle",
  password: "mysqlroot",
});

module.exports = pool.promise();

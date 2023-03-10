const mysql = require("mysql2");

//MySQLとの連携(poolを使用)
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "monster-battle",
  password: "mysqlroot",
});

// promise使用
module.exports = pool.promise();

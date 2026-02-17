const mysql = require("mysql2");

/**
 * MySQL connection pool
 */
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "212215",
  database: "employee_directory",
});

module.exports = db.promise();

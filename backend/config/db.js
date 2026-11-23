// const mysql = require("mysql2");

// /**
//  * MySQL connection pool
//  */
// const db = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "212215",
//   database: "employee_directory",
// });

// module.exports = db.promise();


require("dotenv").config();

const { Pool } = require("pg");

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is missing from .env");
}

const db = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
    max: 10,
    connectionTimeoutMillis: 15000,
    idleTimeoutMillis: 30000
});

// Test connection
db.query("SELECT NOW(), current_database()")
    .then((result) => {
        console.log("Connected to Neon PostgreSQL!");
        console.log("Database:", result.rows[0].current_database);
    })
    .catch((error) => {
        console.error("Neon connection error:", error.message);
    });

db.on("error", (error) => {
    console.error("Unexpected database error:", error);
});

module.exports = db;

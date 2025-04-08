const mysql = require("mysql2/promise");

const pool = mysql.createPool({
	host: "localhost",
	user: "root", // Replace with MySQL username
	password: process.env.DATABASE_PASSWORD, // Replace with MySQL password
	database: "patient_log", // Replace with your database name
	port: 3360, // custom MySQL port
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
});

module.exports = pool;

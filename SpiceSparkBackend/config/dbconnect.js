const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST1,
  user: process.env.DB_USER1,
  password: process.env.DB_PASSWORD1,
  database: process.env.DB_NAME1,
   waitForConnections: true,
  connectionLimit: 10
});

db.connect((err) => {
  if (err) {
    console.log("DB Connection Failed", err);
  } else {
    console.log("MySQL Connected");
  }
});

module.exports = db;
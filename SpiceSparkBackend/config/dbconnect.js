const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST1,
  user: process.env.DB_USER1,
  password: process.env.DB_PASSWORD1,
  database: process.env.DB_NAME1,
    waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0

});

db.connect((err) => {
  if (err) {
    console.log("DB Connection Failed", err);
    handleDisconnect();
  } else {
    console.log("MySQL Connected");
  }
});
db.on('error', (err) => {
  if (err.code === 'ECONNRESET') {
    console.error('Connection reset, reconnecting...');
    handleDisconnect();
  }
});


function handleDisconnect() {
  let connection = mysql.createConnection({ 
    host: process.env.DB_HOST1,
  user: process.env.DB_USER1,
  password: process.env.DB_PASSWORD1,
  database: process.env.DB_NAME1,
    waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
    /* configs */ });

  connection.connect((err) => {
    if (err) setTimeout(handleDisconnect, 2000); // Retry connection
  });

  connection.on('error', (err) => {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      //handleDisconnect(); // Recreate connection if lost
    } else {
      throw err;
    }
  });
}




module.exports = db;
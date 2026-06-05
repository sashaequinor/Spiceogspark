const db = require('../config/dbconnect');
const mysql = require("mysql2");
exports.addMenu = async (req, res) => {

  try{
  const {
    eventTypeId,
    ItemNumber,
    name,
    description,
    price,
    image_url
  } = req.body;

  await db.promise().execute(
    `
    INSERT INTO menu_items
    (
      eventTypeId,
      ItemNumber,
      name,
      description,
      price,
      image_url
    )
    VALUES(?,?,?,?,?,?)
    `,
    [
      eventTypeId,
      ItemNumber,
      name,
      description,
      price,
      image_url
    ]
  );

  res.send({
    success: true
  });
  db.end(); 
 } catch (error) {
  if(error)
  {
    //handleDisconnect();
  }
    res.status(500).json(error);
  }

};
db.on('error', err => {
  //handleDisconnect();
  console.error('DB Error:', err);

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


db.on('end', () => {
  console.log('Connection closed');
});
exports.getMenuByEvent = async (req, res) => {
  try {
  const [rows] =
    await db.promise().query(
      `SELECT * FROM menu_items WHERE eventTypeId=?
      `,
      [req.params.eventTypeId]
    );
  
  res.send(rows);
   } catch (error) {
if(error)
{
  //handleDisconnect();
}

    res.status(500).json(error);
  }
  // db.end(); 
 // return res.status(200).json(rows);
};
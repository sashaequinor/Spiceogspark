const db = require('../config/dbconnect');

exports.addMenu = async (req, res) => {

  const {
    eventTypeId,
    ItemNumber,
    name,
    description,
    price,
    image_url
  } = req.body;

  await db.execute(
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
  // db.end(); 
};

exports.getMenuByEvent = async (req, res) => {
debugger;
  const [rows] =
    await db.promise().query(
      `SELECT * FROM menu_items WHERE eventTypeId=?
      `,
      [req.params.eventTypeId]
    );
debugger;
  res.send(rows);
  // db.end(); 
 // return res.status(200).json(rows);
};
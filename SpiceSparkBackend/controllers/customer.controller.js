const db = require('../config/dbconnect');

exports.addCustomer = async (req, res) => {

  const {
    customerName,
    CustomerEmail,
    customerMobil
   
  } = req.body;

  await db.execute(
    `
    INSERT INTO  customer
    (
      customerName,
      CustomerEmail,
      customerMobil
      
    )
    VALUES(?,?,?)
    `,
    [
      customerName,
      CustomerEmail,
      customerMobil
     
    ]
  );

  res.send({
    success: true
  });
};

exports.getCustomerById = async (req, res) => {

  const [rows] =
    await db.execute(
      `
      SELECT *
      FROM  customer
      WHERE customerId=?
      `,
      [req.params.customerId]
    );

  res.send(rows);
};
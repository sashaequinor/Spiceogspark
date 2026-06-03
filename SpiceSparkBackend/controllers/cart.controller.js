const db = require('../config/dbconnect');

exports.addToCart = async (req, res) => {

  const {
    cart_id,
    menu_item_id,
    quantity
  } = req.body;

  await db.execute(
    `
    INSERT INTO cart_items
    (
      cart_id,
      menu_item_id,
      quantity
    )
    VALUES(?,?,?)
    `,
    [
      cart_id,
      menu_item_id,
      quantity
    ]
  );

  res.send({
    success: true
  });
};
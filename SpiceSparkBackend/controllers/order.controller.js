const db = require('../config/dbconnect');
const { v4: uuidv4 } = require('uuid');
// const orderNumber = uuidv4();
exports.createOrdermain = async (req, res) => {

  const connection =
    await db.getConnection();

  try {

    await connection.beginTransaction();

    const {
      event_id,
      cart_id,
      customer_name,
      customer_email,
      customer_phone,
      payment_method,
      notes
    } = req.body;

    const [cartItems] =
      await connection.execute(
        `
        SELECT
            ci.quantity,
            mi.price,
            mi.name
        FROM cart_items ci
        JOIN menu_items mi
            ON mi.id = ci.menu_item_id
        WHERE ci.cart_id = ?
        `,
        [cart_id]
      );

    if (cartItems.length === 0) {
      return res.status(400).json({
        message: 'Cart is empty'
      });
    }

    let total = 0;

    cartItems.forEach(item => {
      total += item.price * item.quantity;
    });

    const orderNumber =
      `ORD-${Date.now()}`;

    const [orderResult] =
      await connection.execute(
        `
        INSERT INTO orders
        (
          order_number,
          event_id,
          customer_name,
          customer_email,
          customer_phone,
          cart_id,
          total_amount,
          payment_method,
          notes
        )
        VALUES
        (
          ?,?,?,?,?,?,?,?,?
        )
        `,
        [
          orderNumber,
          event_id,
          customer_name,
          customer_email,
          customer_phone,
          cart_id,
          total,
          payment_method,
          notes
        ]
      );

    await connection.execute(
      `
      UPDATE carts
      SET status='ORDERED'
      WHERE id=?
      `,
      [cart_id]
    );

    await connection.commit();
 res.send('Order Created');
    res.status(201).json({
      success: true,
      orderId: orderResult.insertId,
      orderNumber,
      totalAmount: total
    });

  } catch (error) {

    await connection.rollback();
 res.send('Order rejected due to error');
    res.status(500).json({
      success: false,
      error: error.message
    });

  } finally {
    connection.release();
  }
};

exports.getOrdermainById = async (req, res) => {

  const [orders] =
    await db.execute(
      `
      SELECT *
      FROM orders
      WHERE id=?
      `,
      [req.params.orderId]
    );

  if (!orders.length) {
    return res.status(404).json({
      message: 'Order not found'
    });
  }

  const order = orders[0];

  const [items] =
    await db.execute(
      `
      SELECT
        mi.name,
        mi.price,
        ci.quantity
      FROM cart_items ci
      JOIN menu_items mi
        ON mi.id = ci.menu_item_id
      WHERE ci.cart_id = ?
      `,
      [order.cart_id]
    );

  order.items = items;

  res.json(order);
};

exports.updateorderStatus = async (
  req,
  res
) => {

  const { status } = req.body;

  await db.execute(
    `
    UPDATE orders
    SET status=?
    WHERE id=?
    `,
    [
      status,
      req.params.orderId
    ]
  );

  res.json({
    success: true,
    message: 'Status updated'
  });
};
const db = require('../config/dbconnect');

exports.createPayment =
async (req, res) => {

  const {
    orderId,
    provider
  } = req.body;

  const [orders] =
   await db.execute(
     `
     SELECT *
     FROM orders
     WHERE id=?
     `,
     [orderId]
   );

  const order = orders[0];

  const transactionId =
    'TXN-' + Date.now();

  await db.execute(
    `
    INSERT INTO payments
    (
      order_id,
      payment_provider,
      transaction_id,
      amount,
      status
    )
    VALUES(?,?,?,?,?)
    `,
    [
      orderId,
      provider,
      transactionId,
      order.total_amount,
      'PENDING'
    ]
  );

  res.send({
    paymentUrl:
      `https://payment-gateway.com/pay/${transactionId}`
  });
};

exports.paymentConfirmation =
async (req, res) => {

  const {
    transactionId,
    status
  } = req.body;

  const [paymentRows] =
   await db.execute(
     `
     SELECT *
     FROM payments
     WHERE transaction_id=?
     `,
     [transactionId]
   );

  const payment =
    paymentRows[0];

  await db.execute(
    `
    UPDATE payments
    SET status=?
    WHERE id=?
    `,
    [
      status,
      payment.id
    ]
  );

  if (status === 'SUCCESS') {

    await db.execute(
      `
      UPDATE orders
      SET status='PAID'
      WHERE id=?
      `,
      [payment.order_id]
    );
  }

  res.send({
    success: true
  });
};

exports.confirmOrder =
async (req, res) => {

  const orderId =
    req.params.orderId;

  await db.execute(
    `
    UPDATE orders
    SET status='CONFIRMED'
    WHERE id=?
    `,
    [orderId]
  );

  res.send({
    success: true,
    message:
      'Order Confirmed'
  });
};
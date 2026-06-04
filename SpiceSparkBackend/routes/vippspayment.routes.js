const express = require('express');
const router = express.Router();
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const sendReceipt = require("../controllers/sendReceipt");
const db = require('../config/dbconnect');
const { getAccessToken } = require('../controllers/vipps.service');

router.post('/create-payment', async (req, res) => {

  try {

    const {
       customerName,
        email,
        phone,
        amount,
        cart_id,items,order_id,
        deliverySlot,deliveryDate
    } = req.body;
const idempotencyKey = crypto.randomUUID();
    const orderRef = uuidv4();
const { randomUUID } = require('crypto');
    await db.promise().query(
      `INSERT INTO orders
       (
         order_ref,
         customer_name,
         email,
         phone,
         amount,
         cart_id,
         customer_id,
         status
       )
       VALUES (?, ?, ?, ?, ?, ?,111, 'PENDING')`,
      [
        orderRef,
          customerName,
          email,
          phone,
          amount,
          cart_id
      ]
    );

//     const token = await getAccessToken();

//     const paymentPayload = {

//       amount: {
//         currency: 'NOK',
//        // value: 1 * 100
//          value: amount * 100
//       },

//       paymentMethod: {
//         type: 'WALLET'
//       },

//       reference: orderRef,

//       returnUrl:
//         `${process.env.FRONTEND_URL}/payment-success/${orderRef}`,

//       userFlow: 'WEB_REDIRECT'
//     };

//     const payment = await axios.post(
//       `${process.env.VIPPS_BASE_URL}/epayment/v1/payments`,
//       paymentPayload,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Merchant-Serial-Number': process.env.VIPPS_MERCHANT_SERIAL_NUMBER,
//           'Ocp-Apim-Subscription-Key':
//             process.env.VIPPS_SUBSCRIPTION_KEY,
//              'Idempotency-Key': randomUUID(),
//       'Content-Type': 'application/json'
//         }
//       }
//     );
// console.log(process.env.VIPPS_MERCHANT_SERIAL_NUMBER);
//     await db.promise().query(
//       `UPDATE orders
//        SET payment_reference = ?
//        WHERE order_ref = ?`,
//       [
//         payment.data.reference,
//         orderRef
//       ]
//     );
    const order = {
      orderId: order_id,
      customerName: customerName,
      amount: amount,
      paymentDate: new Date().toLocaleDateString(),
      paymentMethod: 'On Stall Pickup',
      items: items,
      deliverySlot: deliverySlot,
      deliveryDate: deliveryDate
    };

    sendReceipt(email, order);
   sendReceipt("spiceogsparkoslo@gmail.com", order);
    sendReceipt("order@spiceogspark.no", order);

// res.json({
//       success: true,
//       message: "Receipt email sent successfully",
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }

    res.json({
      success: true,
      message: "Order Places Successfully. Order Detailed email sent successfully",
      // redirectUrl: payment.data.redirectUrl
    });

  } catch (err) {

    console.log(err.response?.data || err);

    res.status(500).json({
      success: false
    });
  }
});



router.get('/verify/:orderRef', async (req, res) => {

  const token = await getAccessToken();

  const [orders] = await db.promise().query(
    'SELECT * FROM orders WHERE order_ref=?',
    [req.params.orderRef]
  );

  if (!orders.length) {
    return res.status(404).send();
  }

  const order = orders[0];

  const payment = await axios.get(
    `${process.env.VIPPS_BASE_URL}/epayment/v1/payments/${order.payment_reference}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      'Merchant-Serial-Number': process.env.VIPPS_MERCHANT_SERIAL_NUMBER,
        'Ocp-Apim-Subscription-Key':
          process.env.VIPPS_SUBSCRIPTION_KEY,
          'Content-Type': 'application/json'
      }
    }
  );

  res.json(payment.data);
});


router.post('/vipps/webhook', async (req, res) => {

  const event = req.body;

  if (
    event.name === 'epayments.payment.authorized'
  ) {

    await db.promise().query(
      `UPDATE orders
       SET payment_status='PAID'
       WHERE payment_reference=?`,
      [event.reference]
    );
  }

  res.sendStatus(200);
});



module.exports = router;
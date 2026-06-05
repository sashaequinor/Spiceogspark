require("dotenv").config();

const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");
const router = express.Router();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const db = require('../config/dbconnect');
const { v4: uuidv4 } = require('uuid');
router.post('/create-stripe-payment-intent', async (req, res) => {

  try {

    const {
       customerName,
        email,
        phone,
        amount,
        cart_id,items
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

     try {
    const { amount, currency = "nok" } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error(error);

    res.status(500).send({
      error: error.message,
    });
  }
    await db.promise().query(
      `UPDATE orders
       SET payment_reference = ?
       WHERE order_ref = ?`,
      [
        payment.data.reference,
        orderRef
      ]
    );
    const order = {
      orderId: orderRef,
      customerName: customerName,
      amount: amount,
      paymentDate: new Date().toLocaleDateString(),
      paymentMethod: 'Card',
      items: items
    };
  await sendReceipt(email, order);
   await sendReceipt("spiceogsparkoslo@gmail.com", order);
   await sendReceipt("sauravpandora107@gmail.com", order);

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
      redirectUrl: payment.data.redirectUrl
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


router.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  (req, res) => {

    const sig =
      req.headers['stripe-signature'];

    let event;

    try {

      event =
        stripe.webhooks.constructEvent(
          req.body,
          sig,
          process.env.STRIPE_WEBHOOK_SECRET
        );

    } catch (err) {
      return res.status(400).send(
        `Webhook Error: ${err.message}`
      );
    }

    switch (event.type) {

      case 'payment_intent.succeeded':

        const paymentIntent =
          event.data.object;

        console.log(
          'Payment successful:',
          paymentIntent.id
        );

        break;
    }

    res.sendStatus(200);
  }
);



module.exports = router;
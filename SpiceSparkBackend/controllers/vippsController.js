// app.post('/payments/vipps', async (req, res) => {

//   const amount = req.body.amount;

//   const vippsResponse =
//     await vippsClient.createPayment({
//       amount,
//       currency: 'NOK'
//     });

//   res.send({
//     redirectUrl:
//       vippsResponse.redirectUrl
//   });
// });

const axios = require('axios');

async function getAccessToken() {
  const response = await axios.post(
    `${process.env.VIPPS_BASE_URL}/accesstoken/get`,
    {},
    {
      headers: {
        'client_id': process.env.VIPPS_CLIENT_ID,
        'client_secret': process.env.VIPPS_CLIENT_SECRET,
        'Ocp-Apim-Subscription-Key':
          process.env.VIPPS_SUBSCRIPTION_KEY
      }
    }
  );

  return response.data.access_token;
}

const express = require('express');
const crypto = require('crypto');

const app = express();
app.use(express.json());

app.post('/create-payment', async (req, res) => {
  try {
    const token = await getAccessToken();

    const reference = crypto.randomUUID();

    const paymentPayload = {
      amount: {
        currency: 'NOK',
        value: 10000
      },
      paymentMethod: {
        type: 'WALLET'
      },
      reference,
      returnUrl: 'https://spiceogspark.no/payment-success',
      userFlow: 'WEB_REDIRECT'
    };

    const response = await axios.post(
      `${process.env.VIPPS_BASE_URL}/epayment/v1/payments`,
      paymentPayload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Merchant-Serial-Number':
            process.env.VIPPS_MERCHANT_SERIAL_NUMBER,
          'Ocp-Apim-Subscription-Key':
            process.env.VIPPS_SUBSCRIPTION_KEY,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json(response.data);
// Payment Detail Need to save in DB with reference and status as PENDING
    // Then on callback from Vipps, update the status to SUCCESS or FAILED based on the response
  


    const payment = response.data;

res.json({
  redirectUrl: payment.redirectUrl
});

  } catch (error) {
    console.error(error.response?.data || error);
    res.status(500).json({
      message: 'Payment creation failed'
    });
  }
});
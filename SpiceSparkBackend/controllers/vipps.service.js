const axios = require('axios');

async function getAccessToken() {

  const response = await axios.post(
    `${process.env.VIPPS_BASE_URL}/accesstoken/get`,
    {},
    {
      headers: {
        client_id: process.env.VIPPS_CLIENT_ID,
        client_secret: process.env.VIPPS_CLIENT_SECRET,
        'Ocp-Apim-Subscription-Key':
          process.env.VIPPS_SUBSCRIPTION_KEY
      }
    }
  );

  return response.data.access_token;
}

module.exports = {
  getAccessToken
};
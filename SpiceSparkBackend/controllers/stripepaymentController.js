app.post('/payments/card', async (req, res) => {

  const session =
    await stripe.checkout.sessions.create({

      payment_method_types: ['card'],

      line_items: [
        {
          price_data: {
            currency: 'nok',
            product_data: {
              name: 'Event Order'
            },
            unit_amount:
              req.body.amount * 100
          },
          quantity: 1
        }
      ],

      mode: 'payment',

      success_url:
        'https://yourapp.com/success',

      cancel_url:
        'https://yourapp.com/cancel'
    });

  res.send({
    checkoutUrl: session.url
  });
});
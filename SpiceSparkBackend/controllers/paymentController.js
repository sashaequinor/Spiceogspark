const Stripe = require("stripe");

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.createCheckoutSession = async (
  req,
  res
) => {
  try {
    const { product } = req.body;

    const session =
      await stripe.checkout.sessions.create({
        payment_method_types: ["card"],

        line_items: [
          {
            price_data: {
              currency: "nok",

              product_data: {
                name: product.name
              },

              unit_amount:
                product.price * 100
            },

            quantity: 1
          }
        ],

        mode: "payment",

        success_url:
          "http://localhost:3000/success",

        cancel_url:
          "http://localhost:3000/cancel"
      });

    res.json({
      id: session.id
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
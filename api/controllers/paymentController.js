const dotenv = require('dotenv');
dotenv.config();

const expressAsyncHandler = require('express-async-handler');
const Stripe = require('stripe');

const sKEY = process.env.STRIPE_SECRET_KEY;
const stripe = new Stripe(sKEY);

// console.log(sKEY);
// backend => /api/cc/payment/process

async function processPaymentStripe(req, res, next) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: 'huf',

    metadata: { integration_check: 'accept_a_payment' },
  });

  res.status(200).json({
    success: true,
    client_secret: paymentIntent.client_secret,
  });
}

// send api to frontend => /api/cc/payment/process/pay
async function sendStripeApi(req, res, next) {
  res.status(200).json({
    stripeApiKey: process.env.STRIPE_API_KEY,
  });
}

module.exports = { sendStripeApi, processPaymentStripe };

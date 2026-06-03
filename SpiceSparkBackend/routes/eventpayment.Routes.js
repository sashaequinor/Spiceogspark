const router =
 require('express').Router();

const payment =
 require('../controllers/eventpayment.Controller');

router.post(
  '/create-payment',
  payment.createPayment
);

router.post(
  '/confirmation',
  payment.paymentConfirmation
);

module.exports = router;
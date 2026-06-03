const router = require('express').Router();
const menu = require('../controllers/customer.controller');

router.post('/', customer.addCustomer);

router.get(
  '/:customerId',
  customer.getCustomerById
);

module.exports = router;
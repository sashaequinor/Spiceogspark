const router = require('express').Router();

const orderspice =
  require('../controllers/order.controller');

router.post(
  '/create',
  orderspice.createOrdermain
);

router.get(
  '/:orderId',
  orderspice.getOrdermainById
);

router.get(
  '/event/:eventId',
  orderspice.getOrdersByEvent
);

router.patch(
  '/:orderId/status',
  orderspice.updateorderStatus
);

module.exports = router;
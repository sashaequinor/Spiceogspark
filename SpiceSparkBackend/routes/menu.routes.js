const router = require('express').Router();
const menu = require('../controllers/menu.controller');

router.post('/', menu.addMenu);

router.get(
  '/menulist/:eventTypeId',
  menu.getMenuByEvent
);

module.exports = router;
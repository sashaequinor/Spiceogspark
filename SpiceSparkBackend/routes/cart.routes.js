const router = require('express').Router();

const cart =
 require('../controllers/cart.controller');

router.post('/add', cart.addToCart);

module.exports = router;
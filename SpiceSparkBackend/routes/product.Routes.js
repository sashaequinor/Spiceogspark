const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  addProduct,
  getProducts
} = require("../controllers/productController");

router.post("/", auth, addProduct);

router.get("/", getProducts);

module.exports = router;
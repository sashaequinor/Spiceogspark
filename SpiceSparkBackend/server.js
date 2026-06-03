require("dotenv").config();

const express = require("express");

const cors = require("cors");

const app = express();

require("./config/db");
require("./config/dbconnect");
app.use(cors());

app.use(express.json());

app.use("/api/auth",
  require("./routes/authRoutes")
);

app.use("/api/products",
  require("./routes/product.Routes")
);

app.use("/api/payment",
  require("./routes/payment.routes")
);

app.use('/api/menu', require('./routes/menu.routes'));
app.use('/api/cart', require('./routes/cart.routes'));
// app.use('/api/orders', require('./routes/ordermain.routes'));
app.use('/api/eventpayments', require('./routes/vippspayment.routes'));
app.use('/api/stripepayments', require('./routes/stripepayment.routes'));
// app.use('/api/customers', require('./routes/customer.routes'));

app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});
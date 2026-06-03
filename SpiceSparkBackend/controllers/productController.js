const db = require("../config/db");

exports.addProduct = (req, res) => {
  const { name, description, price, image } =
    req.body;

  const sql =
    "INSERT INTO products (name, description, price, image) VALUES (?, ?, ?, ?)";

  db.query(
    sql,
    [name, description, price, image],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Product added"
      });
    }
  );
};

exports.getProducts = (req, res) => {
  db.query(
    "SELECT * FROM products",
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);
    }
  );
};
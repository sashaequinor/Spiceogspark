const transporter = require("./mailer");

async function sendReceipt(customerEmail, orderData) {
  const {
    orderId,
    customerName,
    amount,
    items,
    paymentDate,
  } = orderData;

  const itemsHtml = items
    .map(
      (item) => `
      <tr>
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>Nok ${item.price}</td>
      </tr>
    `
    )
    .join("");
// ${process.env.GMAIL_USER}
  const mailOptions = {
    from: `"Spice og Spark Indisk Takeaway & Caterers" <spiceogsparkoslo@gmail.com>`,
    to: customerEmail,
    subject: `Receipt for Order #${orderId}`,
    html: `
      <h2>Payment Receipt</h2>

      <p>Hello ${customerName},</p>
Dear Guest,

      <p>Thank you for your purchase.</p>

Thank you for choosing Spice Og Spark Indisk Takeaway & Caterers!
We have received your Take Away Order.
you can pickup your Order  within 5-10 minutes

      <p><strong>Order ID:</strong> ${orderId}</p>
      <p><strong>Payment Date:</strong> ${paymentDate}</p>

      <table border="1" cellpadding="8" cellspacing="0">
        <thead>
          <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>

      <h3>Total: Nok ${amount}</h3>

      <p>Thank you for shopping with us.</p> Team Spice og Spark
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Receipt sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Email error:", error);
    throw error;
  }
}

module.exports = sendReceipt;
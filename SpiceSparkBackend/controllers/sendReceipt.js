const transporter = require("./mailer");

async function sendReceipt(customerEmail, orderData) {
  const {
    orderId,
    customerName,
    email,
    customerphone,
    amount,
    items,
    paymentDate,
      deliverySlot,
      deliveryDate
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
    from: `"Spice og Spark Indisk Takeaway & Caterers" <order@spiceogspark.no>`,
    to: customerEmail,
    subject: `Receipt for Order #${orderId}`,
    html: `
      <h2>Order Receipt - Pay at Counter</h2>

      <p>Hello ${customerName},</p>
Dear Guest,

      <p>Thank you for your purchase.</p>

Thank you for choosing Spice Og Spark Indisk Takeaway & Caterers!
We have received your Take Away Order.
you can pickup your Order  from Our Stall - Spice Og Spark Indisk Takeaway & Caterers, at Spikersuppa Oslo. 
 <h2>Please tell your Order Number: ${orderId} at the counter when you come to pickup.</h2>

      <p><strong>Order ID:</strong> ${orderId}</p>
      <p><strong>Booking  Date:</strong> ${paymentDate}</p>
      <p><strong>Delivery Slot:</strong> ${deliverySlot}</p>
      <p><strong>Delivery Date:</strong> ${deliveryDate}</p>

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
    <h2>Pay at Stall when Pickup</h2> 
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

async function sendReceiptOrder(customerEmail, orderData) {
  const {
    orderId,
    customerName,
    email,
    customerphone,
    amount,
    items,
    paymentDate,
      deliverySlot,
      deliveryDate
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
    from: `"Spice og Spark Indisk Takeaway & Caterers" <order@spiceogspark.no>`,
    to: customerEmail,
    subject: `Receipt for Order #${orderId}`,
    html: `
      <h2>Order Receipt - Pay at Counter</h2>

      <p>Hello Admin,</p>
Customer Order Below Detail :

Name: ${customerName}
Phone: ${customerphone}
email: ${Email}
 <h2>Please tell your Order Number: ${orderId} at the counter when you come to pickup.</h2>

      <p><strong>Order ID:</strong> ${orderId}</p>
      <p><strong>Booking  Date:</strong> ${paymentDate}</p>
      <p><strong>Delivery Slot:</strong> ${deliverySlot}</p>
      <p><strong>Delivery Date:</strong> ${deliveryDate}</p>

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
    <h2>Pay at Stall when Pickup</h2> 
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
module.exports=sendReceiptOrder;
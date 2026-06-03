CREATE DATABASE spiceogsparkno02;
USE spiceogsparkno02;
CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200),
    event_date DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE menu_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_id INT,
    name VARCHAR(200),
    description TEXT,
    price DECIMAL(10,2),
    image_url VARCHAR(500),

    FOREIGN KEY (event_id)
    REFERENCES events(id)
);

CREATE TABLE carts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    status ENUM('ACTIVE','ORDERED')
    DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cart_items (
    id INT AUTO_INCREMENT PRIMARY KEY,

    cart_id INT,
    menu_item_id INT,

    quantity INT,

    FOREIGN KEY(cart_id)
    REFERENCES carts(id),

    FOREIGN KEY(menu_item_id)
    REFERENCES menu_items(id)
);

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,

    order_number VARCHAR(100),

    customer_id INT,

    cart_id INT,

    total_amount DECIMAL(10,2),

    status ENUM(
      'PENDING',
      'PAID',
      'FAILED',
      'CONFIRMED'
    ) DEFAULT 'PENDING',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE payments (
    id INT AUTO_INCREMENT PRIMARY KEY,

    order_id INT,

    payment_provider VARCHAR(50),

    transaction_id VARCHAR(200),

    amount DECIMAL(10,2),

    status VARCHAR(50),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
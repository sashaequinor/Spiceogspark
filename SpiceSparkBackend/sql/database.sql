CREATE DATABASE spiceogsparkno01;

USE spiceogsparkno01;

CREATE TABLE user (
    id guid  PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    isAdmin BOOLEAN DEFAULT FALSE,
    isActive BOOLEAN DEFAULT TRUE,
    address VARCHAR(255),
    phone VARCHAR(20),
    profilePicture VARCHAR(255),
    role guid,
    FOREIGN KEY (role) REFERENCES role(id),  
      createdBy guid,
    FOREIGN KEY (createdBy) REFERENCES user(id),
    updatedBy guid,
    FOREIGN KEY (updatedBy) REFERENCES user(id)
    lastLogin TIMESTAMP,
    registrationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resetPasswordToken VARCHAR(255),
    resetPasswordExpires TIMESTAMP,
    emailVerificationToken VARCHAR(255),
    emailVerified BOOLEAN DEFAULT FALSE,
    twoFactorEnabled BOOLEAN DEFAULT FALSE,
    twoFactorSecret VARCHAR(255),
    loginAttempts INT DEFAULT 0,
    lockUntil TIMESTAMP,
    googleId VARCHAR(255) DEFAULT null,
    facebookId VARCHAR(255) DEFAULT null,
    twitterId VARCHAR(255) DEFAULT null,
    firstName VARCHAR(100),
    lastName VARCHAR(100),
    dateOfBirth DATE,
    gender VARCHAR(20)
);

CREATE TABLE products (
    id guid  PRIMARY KEY,
    name VARCHAR(255),
    title VARCHAR(255),
    category VARCHAR(100),
    image VARCHAR(255),
        rating guid,
    FOREIGN KEY (rating) REFERENCES rating(id),    
    description TEXT,
    price DECIMAL(10,2),
    image VARCHAR(255),
    createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    stock INT DEFAULT 0,
    isActive BOOLEAN DEFAULT TRUE,
    isFeatured BOOLEAN DEFAULT FALSE,
    discount DECIMAL(5,2) DEFAULT 0.00,
    tags VARCHAR(255),
    brand VARCHAR(100),
    createdBy guid,
    FOREIGN KEY (createdBy) REFERENCES user(id),
    updatedBy guid,
    FOREIGN KEY (updatedBy) REFERENCES user(id)

);


CREATE TABLE rating (
    id guid  PRIMARY KEY,
    rate INT CHECK (rate >= 1 AND rate <= 5),
    count INT DEFAULT 0,    
    createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,   
    createdBy guid,
    FOREIGN KEY (createdBy) REFERENCES user(id),
    updatedBy guid,
    FOREIGN KEY (updatedBy) REFERENCES user(id)

);


CREATE TABLE role (
    id guid  PRIMARY KEY,
    roleName VARCHAR(500) UNIQUE,
    roleDescription TEXT,    
    createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,   
    createdBy guid,
    FOREIGN KEY (createdBy) REFERENCES user(id),
    updatedBy guid,
    FOREIGN KEY (updatedBy) REFERENCES user(id)

);


CREATE TABLE registerUser (
    id guid  PRIMARY KEY,
    UserName VARCHAR(500) UNIQUE,
    Password varchar(255),
    EmailId VARCHAR(255) UNIQUE,
    RoleId guid,
    FOREIGN KEY (RoleId) REFERENCES role(id),
    type VARCHAR(50),    
    createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,   
    createdBy guid,
    FOREIGN KEY (createdBy) REFERENCES user(id),
    updatedBy guid,
    FOREIGN KEY (updatedBy) REFERENCES user(id)

);


CREATE TABLE wishList (
    id guid  PRIMARY KEY,
    ProductId guid,
    FOREIGN KEY (ProductId) REFERENCES products(id),
    Count INT DEFAULT 1,
    UserId guid,
    FOREIGN KEY (UserId) REFERENCES user(id),
    email VARCHAR(255) UNIQUE,
    
    createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,   
    createdBy guid,
    FOREIGN KEY (createdBy) REFERENCES user(id),
    updatedBy guid,
    FOREIGN KEY (updatedBy) REFERENCES user(id)

);

CREATE TABLE vippsPayment (
    id guid  PRIMARY KEY,
    ProductId guid,
    FOREIGN KEY (ProductId) REFERENCES products(id),
    Count INT DEFAULT 1,
    UserId guid,
    FOREIGN KEY (UserId) REFERENCES user(id),
    email VARCHAR(255) UNIQUE,
    UserName VARCHAR(255) UNIQUE,
    Vippsnumber VARCHAR(200) UNIQUE,
    TotalPrice DECIMAL(10,2),
    DetailedItems TEXT,
    createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,   
    createdBy guid,
    FOREIGN KEY (createdBy) REFERENCES user(id),
    updatedBy guid,
    FOREIGN KEY (updatedBy) REFERENCES user(id)

);

CREATE TABLE addressCustomer (
    id guid  PRIMARY KEY,
    
    email VARCHAR(255) UNIQUE,
 UserId guid,
    FOREIGN KEY (UserId) REFERENCES user(id),
    AddressLine1 VARCHAR(255),
    AddressLine2 VARCHAR(255),
    City VARCHAR(100),
    State VARCHAR(100),
    PostalCode VARCHAR(20),
    Country VARCHAR(100),
    PhoneNumber VARCHAR(20),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    postalCodeLatitude DECIMAL(10, 8),
    postalCodeLongitude DECIMAL(11, 8),

    createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,   
    createdBy guid,
    FOREIGN KEY (createdBy) REFERENCES user(id),
    updatedBy guid,
    FOREIGN KEY (updatedBy) REFERENCES user(id)

);


CREATE TABLE addtoCart (
    id guid  PRIMARY KEY,   
    Count INT DEFAULT 1,
    UserId guid,
    FOREIGN KEY (UserId) REFERENCES user(id),
    email VARCHAR(255) UNIQUE,
    AddedToCart BOOLEAN DEFAULT TRUE,
    discount DECIMAL(5,2) DEFAULT 0.00,
    totalPrice DECIMAL(10,2),
    createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,   
    createdBy guid,
    FOREIGN KEY (createdBy) REFERENCES user(id),
    updatedBy guid,
    FOREIGN KEY (updatedBy) REFERENCES user(id)

);


CREATE TABLE discountCoupan (
    id guid  PRIMARY KEY,    
    UserId guid,
    FOREIGN KEY (UserId) REFERENCES user(id),
    email VARCHAR(255) UNIQUE,
    discountCode VARCHAR(100) UNIQUE,
    discountpercent DECIMAL(10,2),
    discountAmount DECIMAL(10,2),
     expirationDate TIMESTAMP,
     isActive BOOLEAN DEFAULT TRUE,
    createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,   
    createdBy guid,
    FOREIGN KEY (createdBy) REFERENCES user(id),
    updatedBy guid,
    FOREIGN KEY (updatedBy) REFERENCES user(id)

);

CREATE TABLE addtoCartProductMap (
    id guid  PRIMARY KEY,
    ProductId guid,
    FOREIGN KEY (ProductId) REFERENCES products(id),
    Count INT DEFAULT 1,
    UserId guid,
    FOREIGN KEY (UserId) REFERENCES user(id),
    email VARCHAR(255) UNIQUE,
    cartId guid,
    FOREIGN KEY (cartId) REFERENCES addtoCart(id),
    createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,   
    createdBy guid,
    FOREIGN KEY (createdBy) REFERENCES user(id),
    updatedBy guid,
    FOREIGN KEY (updatedBy) REFERENCES user(id)

);



CREATE TABLE GoogleReview (
    id guid  PRIMARY KEY,
     author_name VARCHAR(255),
    author_url VARCHAR(255),
    profile_photo_url VARCHAR(255),
    rating INT CHECK (rating >= 1 AND rating <= 5),
    relative_time_description VARCHAR(255),
        text TEXT,
        time TIMESTAMP,
        UserId guid,
    FOREIGN KEY (UserId) REFERENCES user(id),
    email VARCHAR(255) UNIQUE,
    rating VARCHAR(255) UNIQUE,

    createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,   
    createdBy guid,
    FOREIGN KEY (createdBy) REFERENCES user(id),
    updatedBy guid,
    FOREIGN KEY (updatedBy) REFERENCES user(id)

);


CREATE TABLE Login (
    id guid  PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    username VARCHAR(255) UNIQUE,
    loginTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    role guid,
    FOREIGN KEY (role) REFERENCES role(id),
    type VARCHAR(50),
    rememberMe BOOLEAN DEFAULT FALSE,
    userid guid,
    FOREIGN KEY (userid) REFERENCES user(id),
    firsttimeLogin BOOLEAN DEFAULT TRUE,

    createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,   
    createdBy guid,
    FOREIGN KEY (createdBy) REFERENCES user(id),
    updatedBy guid,
    FOREIGN KEY (updatedBy) REFERENCES user(id)

);

CREATE TABLE ResetPassword (
    id guid  PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    resetToken VARCHAR(255) UNIQUE,
    expirationTime TIMESTAMP,
    newPassword VARCHAR(255),
    passwordReset BOOLEAN DEFAULT FALSE,
    passwordResetTime TIMESTAMP,

    createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,   
    createdBy guid,
    FOREIGN KEY (createdBy) REFERENCES user(id),
    updatedBy guid,
    FOREIGN KEY (updatedBy) REFERENCES user(id)

);

CREATE TABLE orderDetails (
    id guid  PRIMARY KEY,
    orderNumber VARCHAR(255) UNIQUE,
    UserId guid,
    FOREIGN KEY (UserId) REFERENCES user(id),
    email VARCHAR(255) UNIQUE,
        totalAmount DECIMAL(10,2),
        orderStatus VARCHAR(50),
         paymentMethod VARCHAR(50),
         shippingAddress TEXT,
         billingAddress TEXT,
         delvieryDate TIMESTAMP,
         orderItems TEXT,
         deliveryStatus VARCHAR(50),
         trackingNumber VARCHAR(255) UNIQUE,
         shippingCarrier VARCHAR(100),
         deliveryboyName VARCHAR(255),
            deliveryboyPhone VARCHAR(20),
             estimatedDeliveryTime TIMESTAMP,
                actualDeliveryTime TIMESTAMP,
                 isGift BOOLEAN DEFAULT FALSE,
                giftMessage TEXT,
                 createdBy guid,
                 deliveryboyId guid,
                 FOREIGN KEY (deliveryboyId) REFERENCES user(id),                 
    FOREIGN KEY (createdBy) REFERENCES user(id),
    updatedBy guid,
    FOREIGN KEY (updatedBy) REFERENCES user(id),
    createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,   
    createdBy guid,
   

);


CREATE TABLE GiftCard (
    id guid  PRIMARY KEY,
    code VARCHAR(255) UNIQUE,
    amount DECIMAL(10,2),
    expirationDate TIMESTAMP,
    isActive BOOLEAN DEFAULT TRUE,
    expired BOOLEAN DEFAULT FALSE,
    value DECIMAL(10,2),            
    FOREIGN KEY (createdBy) REFERENCES user(id),
    updatedBy guid,
    FOREIGN KEY (updatedBy) REFERENCES user(id),
    createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,   
    createdBy guid,
   

);


CREATE TABLE AddtoCheckout (
    id guid  PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    orderID guid,
    FOREIGN KEY (orderID) REFERENCES orderDetails(id),
    transactionID VARCHAR(255) UNIQUE,
    paymentStatus VARCHAR(50),
        paymentMethod VARCHAR(50),
        totalAmount DECIMAL(10,2),
        UserId guid,
        FOREIGN KEY (UserId) REFERENCES user(id),
        dateAndTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        amountPaid DECIMAL(10,2),
         paymentGatewayResponse TEXT,
         productsPurchased TEXT,
          deliveryAddress TEXT,
           billingAddress TEXT,
           
         createdBy guid,     
    FOREIGN KEY (createdBy) REFERENCES user(id),
    updatedBy guid,
    FOREIGN KEY (updatedBy) REFERENCES user(id),
    createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,   
    createdBy guid,
   

);
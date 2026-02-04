# About this project

This project was created as part of my bachelors degree in web development. It aims to create a booking website, where a user can join events created by DBF, with integration to a payment processor.

# How to run the project
To ensure the project runs correctly, ensure that all environment variables are configured, and the database has the relevant tables

## Database
Events table
```SQL
CREATE TABLE booking_dev.events (
id INT NOT NULL IDENTITY (1,1) PRIMARY KEY,
createdAt DATETIME2(3) NOT NULL DEFAULT GETDATE(),
title VARCHAR(120) NOT NULL,
shortDescription VARCHAR(120),
description VARCHAR(MAX),
creator INT NOT NULL,
price DECIMAL(8,2) NOT NULL DEFAULT 0,
maxSignups INT,
groupSize INT DEFAULT 1,
eventStart DATETIME2(3) NOT NULL,
eventEnd DATETIME2(3),
signupDeadline DATETIME2(3) NOT NULL,
locationName VARCHAR(120),
address VARCHAR(250) NOT NULL,
addressPostCode VARCHAR(4),
addressCity VARCHAR(120),
contactInfo VARCHAR(1000),
imageURL VARCHAR(1000),
)
```

Bookings table:
```SQL
CREATE TABLE booking_dev.bookings (
id INT NOT NULL IDENTITY (1,1) PRIMARY KEY,
createdAt DATETIME2(3) NOT NULL DEFAULT GETDATE(),
groupName VARCHAR(100),
groupLeader VARCHAR(100),
eventID INT NOT NULL,
participantsJSON NVARCHAR(MAX) NOT NULL,
paid BIT DEFAULT 0,
paymentId VARCHAR(250)
)
```

users table:
```SQL
CREATE TABLE booking_dev.users (
id INT NOT NULL IDENTITY (1, 1) PRIMARY KEY,
memberNo INT UNIQUE,
email VARCHAR(250) NOT NULL UNIQUE,
hashedPassword VARCHAR(255) NOT NULL,
refreshToken VARCHAR(255),
postCode VARCHAR(4),
isCreator BIT DEFAULT 0,
isAdmin BIT DEFAULT 0,
createdAt DATETIME2(3) NOT NULL DEFAULT GETDATE()
);
```

There is also another database, that this project ustilises - this is for the membernumbers, first, and last names of customers in an existing system, to verify accounts

This database must have a field named PRIMAERKLUB set to 9999 for all relevant users, a name field, surname field, and an id, which is used as the member number

## Environment variables
ensure all these are filled and connected to the relevant service providers. This requires a Stripe account and an MSSQL database
```env
DB_HOST=
DB_DATABASE=
DB_PORT=  
DB_USER=
DB_PASSWORD=

JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=

NEXT_PUBLIC_URL="http://localhost:3000" # replace with your deployment URL when deploying

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

## Running the project
```terminal
npm install
npm run dev
```


# Fictional-Online-Store
This repository contains the code for a fictional online store, which is a RESTful API built using Node.js and Express.js.
The API allows users to perform various actions related to products, orders, and user authentication.

## Installation
1. Clone the repository: https://github.com/VishhalYadav/Fictional-Online-Store.git
2. Install the dependencies: cd Fictional-Online-Store npm install
3. Start the server: npm start
The server will start running on http://localhost:3000.

## Packages Used

The project utilizes the following packages:

- Express.js: Fast, unopinionated, and minimalist web framework for Node.js.
- Mongoose: Elegant MongoDB object modeling for Node.js.
- Validator: A library for string validation and sanitization.
- Bcrypt.js: Library for password hashing and verification.
- JSON Web Token (JWT): For generating and verifying JSON web tokens.
- Morgan: HTTP request logger middleware.
- dotenv: Loads environment variables from a `.env` file.
- Nodemon: Utility that monitors changes in the source code and automatically restarts the server.

Packages used for Security Purposes- 
-xss-clean -  A package that helps prevent cross-site scripting (XSS) attacks by sanitizing user input and removing malicious code.
-helmet -  A package that helps prevent cross-site scripting (XSS) attacks by sanitizing user input and removing malicious code.
-express-rate-limit -  A middleware that limits the number of requests that can be made to an API within a certain time frame, helping to prevent abuse, brute-force attacks, and DDoS attacks.
-express-mongo-sanitize - A middleware that sanitizes user-supplied data to prevent MongoDB query injection attacks by removing any characters or operators that could alter the query's behavior.

## Routes and Route Handlers

The API consists of the following routes and their corresponding route handlers:
1. User 
- `POST /api/v1/users/signup`: Register a new user.
- `POST /api/v1/users/login`: User login and authentication.(in case logging as existing user, use password-password123 or you can signup)
- `POST /api/v1/users/cart`: Add products to cart, accepts userId, productId and quantity.(Authenication Required)
- `POST /api/v1/users/multiple-products-cart`: Add multiple products to cart at once, it accepts userId and array of object with property- productId and quantity.(Authenication Required)
- `POST /api/v1/users/place-order`: To place an order, it accepts userId, shippingaAddress and paymentMethod.(Authenication Required)

2. Product
- `GET /api/v1/products/search`: Retrieve a list of all products, search by name, description and category and implemented pagination.
- `GET /api/v1/products/:id`: Retrieve a single product by its ID.(Authenication Required)
- `POST /api/v1/products`: Create a new product.(Authenication Required)
- `PATCH /api/v1/products/:id`: Update a product by its ID.(Authenication Required)
- `DELETE /api/v1/products/:id`: Delete a product by its ID.(Authenication Required)

3. Order
- `GET /api/v1/orders`: Retrieve a list of all orders, implemented pagination.(Authenication Required)

Please refer to the source code for detailed implementations of each route handler.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, please open an issue or submit a pull request.




## Hosted Project

[E-Commerce API Render URL](https://e-commerce-api-nodejs-2u6f.onrender.com/)

This repository contains detailed documentation for an E-Commerce API that provides various endpoints for user authentication, product management, reviews, and order handling. The API is built using Node.js and Express.

## E-Commerce API Documentation

### Authentication Endpoints

#### Logout
- **Method**: GET
- **Endpoint**: `/api/v1/auth/logout`
  - Logs out the currently authenticated user.

#### Login
- **Method**: POST
- **Endpoint**: `/api/v1/auth/login`
  - Logs in a user with the provided credentials.
  - **Request Body**:
    ```json
    {
        "email": "shinzo@gmail.com",
        "password": "hattori"
    }
    ```

#### Register
- **Method**: POST
- **Endpoint**: `/api/v1/auth/register`
  - Registers a new user account.
  - **Request Body**:
    ```json
    {
        "name": "shinzo",
        "email": "shinzo@gmail.com",
        "password": "hattori"
    }
    ```

### User Management Endpoints

#### Get All Users
- **Method**: GET
- **Endpoint**: `/api/v1/users`
  - Retrieves a list of all users.

#### Get Single User
- **Method**: GET
- **Endpoint**: `/api/v1/users/{userId}`
  - Retrieves details of a specific user by ID.

#### Show Current User
- **Method**: GET
- **Endpoint**: `/api/v1/users/showCurrentUser`
  - Retrieves details of the currently authenticated user.

#### Update User
- **Method**: PATCH
- **Endpoint**: `/api/v1/users/updateUser`
  - Updates the current user's details.
  - **Request Body**:
    ```json
    {
        "name": "ninjaaa_hattori",
        "email": "hattori@gmail.com"
    }
    ```

#### Update User Password
- **Method**: PATCH
- **Endpoint**: `/api/v1/users/updateUserPassword`
  - Updates the current user's password.
  - **Request Body**:
    ```json
    {
        "oldPassword": "ninja_village",
        "newPassword": "hattori"
    }
    ```

### Product Management Endpoints

#### Get All Products
- **Method**: GET
- **Endpoint**: `/api/v1/products`
  - Retrieves a list of all products.

#### Create Product
- **Method**: POST
- **Endpoint**: `/api/v1/products`
  - Creates a new product.
  - **Request Body**:
    ```json
    {
        "name": "suzuki hayate",
        "price": 299,
        "colors": ["#000", "#ffb900"],
        "company": "liddy",
        "description": "Cloud bread VHS hell of banjo bicycle rights jianbing umami...",
        "category": "kitchen"
    }
    ```

#### Get Single Product
- **Method**: GET
- **Endpoint**: `/api/v1/products/{productId}`
  - Retrieves details of a specific product by ID.

#### Update Product
- **Method**: PATCH
- **Endpoint**: `/api/v1/products/{productId}`
  - Updates a product by ID.
  - **Request Body**:
    ```json
    {
        "name": "iphone"
    }
    ```

#### Delete Product
- **Method**: DELETE
- **Endpoint**: `/api/v1/products/{productId}`
  - Deletes a product by ID.

### Review Management Endpoints

#### Get All Reviews
- **Method**: GET
- **Endpoint**: `/api/v1/reviews`
  - Retrieves all reviews.

#### Get Single Review
- **Method**: GET
- **Endpoint**: `/api/v1/reviews/{reviewId}`
  - Retrieves details of a specific review by ID.

#### Create Review
- **Method**: POST
- **Endpoint**: `/api/v1/reviews`
  - Adds a new review.
  - **Request Body**:
    ```json
    {
        "product": "6636022edb53e50273f6c831",
        "rating": 3,
        "title": "hattori: okay product",
        "comment": "hattori: approves"
    }
    ```

#### Update Review
- **Method**: PATCH
- **Endpoint**: `/api/v1/reviews/{reviewId}`
  - Updates a review by ID.
  - **Request Body**:
    ```json
    {
        "rating": 5,
        "title": "hattori: title",
        "comment": "hattori: hattori approves"
    }
    ```

#### Delete Review
- **Method**: DELETE
- **Endpoint**: `/api/v1/reviews/{reviewId}`
  - Deletes a review by ID.

### Order Management Endpoints

#### Create Order
- **Method**: POST
- **Endpoint**: `/api/v1/orders`
  - Places a new order.
  -

 **Request Body**:
    ```json
    {
        "tax": 499,
        "shippingFee": 799,
        "items": [
          {
            "name": "bed",
            "price": 2699,
            "image": "https://dl.airtable.com/.attachmentThumbnails/e8bc3791196535af65f40e36993b9e1f/438bd160",
            "amount": 10,
            "product": "66360229db53e50273f6c82f"
          },
          {
            "name": "chair",
            "price": 2999,
            "image": "https://dl.airtable.com/.attachmentThumbnails/e8bc3791196535af65f40e36993b9e1f/438bd160",
            "amount": 20,
            "product": "6636022edb53e50273f6c831"
          }
        ]
    }
    ```

#### Get Single Order
- **Method**: GET
- **Endpoint**: `/api/v1/orders/{orderId}`
  - Retrieves details of a specific order by ID.

#### Update Order
- **Method**: PATCH
- **Endpoint**: `/api/v1/orders/{orderId}`
  - Updates an order by ID.
  - **Request Body**:
    ```json
    {
        "paymentIntent": "key-one-payment"
    }
    ```

#### Delete Order
- **Method**: DELETE
- **Endpoint**: `/api/v1/orders/{orderId}`
  - Deletes an order by ID.

#### Get Current User All Orders
- **Method**: GET
- **Endpoint**: `/api/v1/orders/showAllMyOrders`
  - Retrieves all orders placed by the currently authenticated user.

#### Get All Orders
- **Method**: GET
- **Endpoint**: `/api/v1/orders/`
  - Retrieves a list of all orders.

---

This documentation provides a comprehensive guide to using the E-Commerce API. Each section outlines the available endpoints, their functionalities, and request/response formats where applicable. Use this guide to interact with the API and understand its capabilities.

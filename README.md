# GrubDash

## Description
GrubDash is an Express.js application for managing a collection of dishes and orders in a restaurant setting. It provides functionalities for creating, reading, updating, and listing dishes and orders.

## Features
- CRUD operations for dishes.
- CRUD operations for orders (create, read, update, delete, list).
- Data validation and error handling for a smooth user experience.

## Usage
With the server running, the API endpoints can be accessed at `http://localhost:5000/`.

### Endpoints
- **Dishes**
- `GET /dishes`: List all dishes.
- `POST /dishes`: Create a new dish.
- `GET /dishes/:dishId`: Retrieve a specific dish.
- `PUT /dishes/:dishId`: Update a specific dish.

- **Orders**
- `GET /orders`: List all orders.
- `POST /orders`: Create a new order.
- `GET /orders/:orderId`: Retrieve a specific order.
- `PUT /orders/:orderId`: Update a specific order.
- `DELETE /orders/:orderId`: Delete a specific order.

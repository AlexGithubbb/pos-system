# POS System

This is a simple POS (Point of Sale) system built with React and Node.js.

## Setup Instructions

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14.x or higher)


### Installation
Navigate to both the frontend and backend directories and run:

```zsh 
cd client
npm install
cd server
npm install
```

### Running the Application

1. Start the backend server:
Navigate to the backend directory:
```zsh
 node src/index.js
```

The backend server will start on http://localhost:4000 by default.
Start the frontend development server:

Navigate to the frontend directory:
```zsh
cd client
npm start
```
The frontend will start on http://localhost:3000 by default.


## Documentation

### Architecture Overview

The POS system consists of two main parts:

1. **Frontend**:
   - Built with React and Material-UI.
   - Provides a user interface for selecting tables, creating bill, adding items to orders, and managing transactions.
   - Interacts with the backend GraphQL API to fetch and update data.

2. **Backend**:
   - Built with Node.js, Express, and GraphQL.
   - Provides a GraphQL API for managing orders, tables, and menu items.
   - Persists data in a JSON file (or could be extended to use a database like MongoDB or PostgreSQL).

### Interacting with the POS System

1. **Select a Table:**:
    - Click on any table number to start a new order or view an existing order.
2. **Create New Bill:**:
    - Click on Create Bill button to create new bill for the current table.
3. **Add Menu Items:**:
    - Click on any menu item to add it to the current order.
4. **Manage Orders::**:
    - Adjust quantities or remove items directly from the order summary.
    - Use the "Ready to Serve" button to confirm the order is ready, or "Checkout" to complete the transaction.


### GraphQL API Overview### 
- The backend uses GraphQL for all data interactions.
- The main endpoint is typically /graphql (e.g., http://localhost:4000/graphql).

**Example Queries and Mutations**A
- Query to Get Menu Items:
    ```graphql
    query GetMenuItems {
        getMenuItems {
        id
        name
        price
        }
    }
    ```
- Mutation to Update Bill Info:
    ```graphql
    updateBill(tableNumber: $tableNumber, items: $items) {
        id
        tableNumber
        items {
            menuItem {
            id
            name
            price
            }
            quantity
        }
        totalAmount
    }
    ```

Refer to the code and comments for more details on each endpoint and the request/response format.

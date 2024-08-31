const { gql } = require('apollo-server-express');
// GraphQL Schema
const typeDefs = gql`
  type MenuItem {
    id: ID!
    name: String!
    price: Float!
  }

  type Bill {
    id: ID!
    tableNumber: Int!
    items: [OrderItem!]!
    totalAmount: Float!
    timestamp: String
  }

  type OrderItem {
    menuItem: MenuItem!
    quantity: Int!
  }

  input OrderItemInput {
    menuItem: MenuItemInput!
    quantity: Int!
  }

  input MenuItemInput {
    id: ID!
    name: String!
    price: Float!
  }

  type Query {
    getMenuItems: [MenuItem!]!
    getBill(tableNumber: Int!): Bill
  }

  type Mutation {
    createBill(tableNumber: Int!): Bill!
    updateBill(tableNumber: Int!, items: [OrderItemInput!]!): Bill!
    checkoutBill(tableNumber: Int!): Bill!
    }
`;

module.exports=typeDefs;
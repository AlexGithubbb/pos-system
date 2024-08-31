const express = require('express');
const { ApolloServer } = require('apollo-server-express');

// Use require to import schema and resolvers
const typeDefs = require('./schema'); 
const resolvers = require('./resolvers');

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

// Start the server and then apply middleware
async function startApolloServer() {
  await server.start(); 
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

startApolloServer(); // Call the async function to start the server

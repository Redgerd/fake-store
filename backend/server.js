import express from "express";
import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js"; // Use the correct package for Supabase

// Import models and GraphQL schema
import models from "./src/models/index.js";
import typeDefs from "./src/schemas/typeDefs.js";
import resolvers from "./src/resolvers/index.js";

// Load environment variables
dotenv.config();

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Create an Express application
const app = express();

// Create an Apollo Server instance
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    supabase,
  },
});

// Start the server
const startServer = async () => {
  try {
    // Start Apollo Server
    await apolloServer.start();

    // Apply Apollo middleware to Express
    apolloServer.applyMiddleware({ app });

    // Test Supabase connection (basic connectivity check using products table)
    const { error } = await supabase.from("products").select("*").limit(1);
    if (error)
      throw new Error(`Unable to connect to Supabase: ${error.message}`);
    console.log("Supabase connected successfully.");

    // Start the Express server
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(
        `Server is running on http://localhost:${PORT}${apolloServer.graphqlPath}`
      );
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();

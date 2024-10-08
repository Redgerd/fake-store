# E-commerce Data Integration and Backend with GraphQL

This project demonstrates the integration of e-commerce data from the [FakeStore API](https://fakestoreapi.com/) into a relational database (Supabase PostgreSQL), followed by building a backend using Node.js with GraphQL.

## Features

- Data fetching from the FakeStore API (a mock e-commerce API).
- Data transformation using ETL (Extract, Transform, Load) script.
- Storage of the transformed data in Supabase (PostgreSQL).
- Backend development using Node.js and GraphQL for querying and mutating the data.

## Project Structure

- **ETL Script**: Fetches and transforms e-commerce data (products, categories, etc.) from the FakeStore API and transfers it to a relational PostgreSQL database (hosted on Supabase).
  
- **Database**: Supabase PostgreSQL is used to store the e-commerce data in structured tables.

- **Backend**: Node.js is used to create a GraphQL API that allows querying and manipulating the data stored in the PostgreSQL database.

## Technologies Used

- **FakeStore API**: Source of mock e-commerce data.
- **Supabase**: PostgreSQL database hosting and management.
- **Node.js**: Backend runtime for building the server.
- **GraphQL**: API query language for efficient data fetching.
- **ETL (Extract, Transform, Load)**: Script for data transformation and loading into the database.

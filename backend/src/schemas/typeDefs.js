import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    id: Int!
    email: String!
    username: String!
    name_firstname: String!
    name_lastname: String!
    address_city: String
    address_street: String
    address_number: Int
    address_zipcode: String
    address_geolocation_lat: Float
    address_geolocation_long: Float
    phone: String
  }

  type Product {
    id: Int!
    title: String!
    price: Float!
    description: String
    image: String
    category: String!
  }

  type Cart {
    id: Int!
    user_id: Int!
    date: String!
    user: User
    items: [CartItem]
  }

  type CartItem {
    id: Int!
    cart_id: Int!
    product_id: Int!
    quantity: Int!
    cart: Cart
    product: Product
  }

  type Query {
    users: [User]
    products(category: String, minPrice: Float, maxPrice: Float): [Product]
    carts: [Cart]
    cartItems: [CartItem]
  }

  type Mutation {
    createUser(email: String!, username: String!): User
    createProduct(title: String!, price: Float!): Product
    createCart(user_id: Int!): Cart
    addItemToCart(cart_id: Int!, product_id: Int!, quantity: Int!): CartItem
  }
`;

export default typeDefs;

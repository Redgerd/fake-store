import { createClient } from "@supabase/supabase-js";
import fetch from "node-fetch";

// Supabase configuration
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Function to fetch products from FakeStoreAPI
async function fetchProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok)
      throw new Error(`Error fetching products: ${response.statusText}`);
    return response.json();
  } catch (error) {
    console.error("Error in fetchProducts:", error);
    return [];
  }
}

// Function to fetch users from FakeStoreAPI
async function fetchUsers() {
  try {
    const response = await fetch("https://fakestoreapi.com/users");
    if (!response.ok)
      throw new Error(`Error fetching users: ${response.statusText}`);
    return response.json();
  } catch (error) {
    console.error("Error in fetchUsers:", error);
    return [];
  }
}

// Function to insert products into Supabase
async function insertProductsIntoSupabase(products) {
  try {
    console.log("Inserting products:", products);
    const { data, error } = await supabase.from("products").upsert(
      products.map((product) => ({
        id: product.id,
        title: product.title,
        price: product.price,
        description: product.description,
        image: product.image,
        category: product.category,
      }))
    );

    if (error) {
      console.error("Error inserting products:", error);
    } else {
      console.log("Products inserted successfully:", data);
    }
  } catch (error) {
    console.error("Error in insertProductsIntoSupabase:", error);
  }
}

// Function to insert users into Supabase
async function insertUsersIntoSupabase(users) {
  try {
    console.log("Inserting users:", users);
    const { data, error } = await supabase.from("users").upsert(
      users.map((user) => ({
        email: user.email,
        username: user.username,
        password: user.password, // In a real app, ensure passwords are hashed
        name_firstname: user.name.firstname,
        name_lastname: user.name.lastname,
        address_city: user.address.city,
        address_street: user.address.street,
        address_number: user.address.number,
        address_zipcode: user.address.zipcode,
        address_geolocation_lat: user.address.geolocation.lat,
        address_geolocation_long: user.address.geolocation.long,
        phone: user.phone,
      }))
    );

    if (error) {
      console.error("Error inserting users:", error);
    } else {
      console.log("Users inserted successfully:", data);
    }
  } catch (error) {
    console.error("Error in insertUsersIntoSupabase:", error);
  }
}

// Main function to execute data fetching and inserting
async function main() {
  try {
    const products = await fetchProducts();
    await insertProductsIntoSupabase(products);

    const users = await fetchUsers();
    await insertUsersIntoSupabase(users);
  } catch (error) {
    console.error("Error in main function:", error);
  }
}

main();

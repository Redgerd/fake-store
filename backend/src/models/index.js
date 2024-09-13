import sequelize from "../config/supabase.js"; // Ensure the path is correct
import { Sequelize, DataTypes } from "sequelize";

// Import your models
import User from "./user.js";
import Product from "./product.js";
import Cart from "./cart.js";
import CartItem from "./cart_item.js";

// Initialize models
const models = {
  User: User(sequelize, DataTypes),
  Product: Product(sequelize, DataTypes),
  Cart: Cart(sequelize, DataTypes),
  CartItem: CartItem(sequelize, DataTypes),
};

// Check for associations
Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };
export default models;

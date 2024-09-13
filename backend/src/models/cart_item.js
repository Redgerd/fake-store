const CartItemModel = (sequelize, DataTypes) => {
  const CartItem = sequelize.define("cart_item", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cart_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "carts", // 'carts' refers to table name
        key: "id", // 'id' refers to column name in carts table
      },
      onDelete: "CASCADE", // Delete cart item when the cart is deleted
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "products", // 'products' refers to table name
        key: "id", // 'id' refers to column name in products table
      },
      onDelete: "CASCADE", // Delete cart item when the product is deleted
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  // Associations can be defined here
  CartItem.associate = (models) => {
    CartItem.belongsTo(models.Cart, {
      foreignKey: "cart_id",
      onDelete: "CASCADE",
    });
    CartItem.belongsTo(models.Product, {
      foreignKey: "product_id",
      onDelete: "CASCADE",
    });
  };

  return CartItem;
};

export default CartItemModel;

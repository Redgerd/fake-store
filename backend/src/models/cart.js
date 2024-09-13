const CartModel = (sequelize, DataTypes) => {
  const Cart = sequelize.define("cart", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users", // 'users' refers to table name
        key: "id", // 'id' refers to column name in users table
      },
      onDelete: "CASCADE", // Delete cart when the user is deleted
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });

  // Associations can be defined here
  Cart.associate = (models) => {
    Cart.belongsTo(models.User, { foreignKey: "user_id", onDelete: "CASCADE" });
    Cart.hasMany(models.CartItem, {
      foreignKey: "cart_id",
      onDelete: "CASCADE",
    });
  };

  return Cart;
};

export default CartModel;
